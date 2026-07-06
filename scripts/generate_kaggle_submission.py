import argparse
import csv
import json
import os
import subprocess
import tempfile
import time
from pathlib import Path

import pyarrow.parquet as pq
from faster_whisper import WhisperModel


LANGUAGE_CODES = {"swa", "kik", "luo", "som", "mas", "kln"}
WHISPER_LANGUAGE_HINTS = {"swa": "sw", "som": "so"}


def iter_members(archive_path: Path):
    result = subprocess.run(
        ["tar", "-tf", str(archive_path)],
        check=True,
        capture_output=True,
        text=True,
    )
    for member_name in result.stdout.splitlines():
        if member_name.endswith(".parquet"):
            yield member_name


def read_parquet_from_archive(archive_path: Path, member_name: str, work_dir: Path) -> Path:
    subprocess.run(
        ["tar", "-xf", str(archive_path), "-C", str(work_dir), member_name],
        check=True,
    )
    return work_dir / member_name


def clean_prediction(text: str) -> str:
    return " ".join(str(text or "").strip().split())


def transcribe_bytes(model: WhisperModel, audio_bytes: bytes, language: str, clip_path: Path) -> tuple[str, float]:
    clip_path.write_bytes(audio_bytes)
    started = time.perf_counter()
    try:
        segments, _info = model.transcribe(
            str(clip_path),
            language=WHISPER_LANGUAGE_HINTS.get(language),
            beam_size=1,
            vad_filter=True,
            condition_on_previous_text=False,
        )
        prediction = clean_prediction(" ".join(segment.text for segment in segments))
    except Exception as exc:
        prediction = ""
        print(f"warning=audio_decode_failed file={clip_path.name} error={exc}", flush=True)
    elapsed_ms = (time.perf_counter() - started) * 1000
    return prediction, elapsed_ms


def build_submission(
    archive_path: Path,
    output_csv: Path,
    report_json: Path,
    model_name: str,
    compute_type: str,
    limit_rows: int | None,
    resume: bool,
    progress_every: int,
) -> None:
    output_csv.parent.mkdir(parents=True, exist_ok=True)
    report_json.parent.mkdir(parents=True, exist_ok=True)

    model = WhisperModel(model_name, device="cpu", compute_type=compute_type)
    latencies = []
    row_total = 0
    shard_total = 0
    language_counts = {code: 0 for code in sorted(LANGUAGE_CODES)}
    completed_ids = set()
    if resume and output_csv.exists():
        with output_csv.open("r", newline="", encoding="utf-8") as existing:
            reader = csv.DictReader(existing)
            if reader.fieldnames in (["id", "language", "transcription"], ["id", "language", "prediction"]):
                for row in reader:
                    completed_ids.add(row["id"])
        row_total = len(completed_ids)

    with tempfile.TemporaryDirectory(prefix="anv_kaggle_") as tmp:
        work_dir = Path(tmp)
        write_mode = "a" if completed_ids else "w"
        with output_csv.open(write_mode, newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=["id", "language", "transcription"])
            if not completed_ids:
                writer.writeheader()

            for member_name in iter_members(archive_path):
                if limit_rows is not None and row_total >= limit_rows:
                    break

                shard_total += 1
                parquet_path = read_parquet_from_archive(archive_path, member_name, work_dir)
                path_language = member_name.split("/", 1)[0]
                if path_language not in LANGUAGE_CODES:
                    path_language = "swa"

                parquet_file = pq.ParquetFile(parquet_path)
                for batch in parquet_file.iter_batches(
                    batch_size=1,
                    columns=["audio", "id", "language"],
                    use_threads=False,
                ):
                    if limit_rows is not None and row_total >= limit_rows:
                        break

                    row = batch.to_pydict()
                    sample_id = row["id"][0]
                    if sample_id in completed_ids:
                        continue
                    sample_language = row["language"][0] or path_language
                    if sample_language not in LANGUAGE_CODES:
                        sample_language = path_language

                    audio = row["audio"][0] or {}
                    audio_bytes = audio.get("bytes")
                    if audio_bytes:
                        prediction, elapsed_ms = transcribe_bytes(
                            model,
                            audio_bytes,
                            sample_language,
                            work_dir / "clip.wav",
                        )
                    else:
                        prediction, elapsed_ms = "", 0.0

                    writer.writerow({
                        "id": str(sample_id).strip(),
                        "language": sample_language,
                        "transcription": prediction or "[inaudible]",
                    })
                    latencies.append(elapsed_ms)
                    language_counts[sample_language] = language_counts.get(sample_language, 0) + 1
                    row_total += 1
                    if progress_every and row_total % progress_every == 0:
                        print(f"processed_rows={row_total} last_id={sample_id}", flush=True)

                try:
                    parquet_path.unlink()
                except OSError:
                    pass

    nonzero_latencies = [value for value in latencies if value > 0]
    report = {
        "submission_csv": str(output_csv),
        "rows": row_total,
        "shards_processed": shard_total,
        "model_name": model_name,
        "runtime": "faster-whisper",
        "device": "cpu",
        "compute_type": compute_type,
        "language_counts": language_counts,
        "latency_ms": {
            "mean": sum(nonzero_latencies) / len(nonzero_latencies) if nonzero_latencies else 0,
            "min": min(nonzero_latencies) if nonzero_latencies else 0,
            "max": max(nonzero_latencies) if nonzero_latencies else 0,
            "files_measured": len(nonzero_latencies),
        },
        "submission_columns": ["id", "language", "transcription"],
        "manual_transcription_used": False,
    }
    report_json.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--archive", required=True)
    parser.add_argument("--output-csv", required=True)
    parser.add_argument("--report-json", required=True)
    parser.add_argument("--model", default=os.environ.get("KAGGLE_ASR_MODEL", "tiny"))
    parser.add_argument("--compute-type", default=os.environ.get("KAGGLE_ASR_COMPUTE_TYPE", "int8"))
    parser.add_argument("--limit-rows", type=int, default=None)
    parser.add_argument("--resume", action="store_true")
    parser.add_argument("--progress-every", type=int, default=100)
    args = parser.parse_args()
    build_submission(
        archive_path=Path(args.archive),
        output_csv=Path(args.output_csv),
        report_json=Path(args.report_json),
        model_name=args.model,
        compute_type=args.compute_type,
        limit_rows=args.limit_rows,
        resume=args.resume,
        progress_every=args.progress_every,
    )


if __name__ == "__main__":
    main()
