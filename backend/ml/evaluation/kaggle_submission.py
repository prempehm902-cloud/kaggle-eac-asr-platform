import csv
import json
from pathlib import Path

from app.core.competition import SUBMISSION_COLUMNS, submission_row, validate_submission_rows


def write_submission_from_manifest(manifest_path: Path, output_path: Path) -> dict:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    rows = []
    if manifest_path.exists():
        for index, line in enumerate(manifest_path.read_text(encoding="utf-8").splitlines(), start=1):
            if not line.strip():
                continue
            item = json.loads(line)
            audio_path = Path(item.get("path", ""))
            rows.append(submission_row(
                audio_path.stem or item.get("id") or f"anv_test_{index:04d}",
                item.get("language") or item.get("language_code"),
                item.get("prediction") or item.get("transcript") or item.get("text") or "",
            ))

    if not rows:
        rows = [submission_row(
            "dataset_not_synced",
            "swa",
            "sync Kaggle dataset and run ASR predictions before final upload",
        )]

    validation = validate_submission_rows(rows)
    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=SUBMISSION_COLUMNS, extrasaction="raise")
        writer.writeheader()
        writer.writerows(rows)
    return validation


if __name__ == "__main__":
    report = write_submission_from_manifest(
        Path("data/manifests/kaggle-test.jsonl"),
        Path("outputs/local_data/submission.csv"),
    )
    print(f"Wrote outputs/local_data/submission.csv with columns {SUBMISSION_COLUMNS}: {report}")
