import csv
import json
from pathlib import Path


def write_submission_from_manifest(manifest_path: Path, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    rows = []
    if manifest_path.exists():
        for index, line in enumerate(manifest_path.read_text(encoding="utf-8").splitlines(), start=1):
            if not line.strip():
                continue
            item = json.loads(line)
            audio_path = Path(item.get("path", ""))
            rows.append({
                "audio_id": audio_path.stem or f"anv_test_{index:04d}",
                "transcript": item.get("transcript", ""),
                "language": item.get("language", "unknown"),
            })

    if not rows:
        rows = [{
            "audio_id": "dataset_not_synced",
            "transcript": "sync Kaggle dataset and run ASR predictions before final upload",
            "language": "unknown",
        }]

    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["audio_id", "transcript", "language"])
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    write_submission_from_manifest(
        Path("data/manifests/kaggle-test.jsonl"),
        Path("outputs/local_data/submission.csv"),
    )
    print("Wrote outputs/local_data/submission.csv")
