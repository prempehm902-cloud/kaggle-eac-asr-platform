import csv
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session

from app.config import get_settings
from app.core.inference import transcribe_audio
from app.core.model_adapters import get_active_adapter
from app.db.models import KaggleSubmission
from app.db.seed import seed_reference_data
from app.db.session import get_db

router = APIRouter()


class KaggleSubmissionRequest(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    model_name: str | None = None
    dataset_name: str = "digitalumuganda/anv-test-data-nt"
    sample_count: int = 6


AUDIO_EXTENSIONS = {".wav", ".mp3", ".m4a", ".flac", ".ogg", ".webm"}


def _candidate_audio_files(limit: int) -> list[Path]:
    manifest = Path("data/manifests/kaggle-test.jsonl")
    files: list[Path] = []
    if manifest.exists():
        for line in manifest.read_text(encoding="utf-8").splitlines():
            if len(files) >= limit:
                break
            if not line.strip():
                continue
            try:
                import json
                row = json.loads(line)
            except json.JSONDecodeError:
                continue
            path = Path(row.get("path", ""))
            if path.exists() and path.suffix.lower() in AUDIO_EXTENSIONS:
                files.append(path)
    dataset_path = get_settings().local_kaggle_dataset_path
    if dataset_path.exists() and dataset_path.is_dir():
        for item in sorted(dataset_path.rglob("*")):
            if len(files) >= limit:
                break
            if item.is_file() and item.suffix.lower() in AUDIO_EXTENSIONS and item not in files:
                files.append(item)
    return files


@router.post("/kaggle")
def create_kaggle_submission(payload: KaggleSubmissionRequest | None = None, db: Session = Depends(get_db)) -> dict:
    payload = payload or KaggleSubmissionRequest()
    model = seed_reference_data(db)
    active_adapter = get_active_adapter()
    selected_model = payload.model_name or active_adapter["model_name"] or model.name
    output_dir = Path("outputs/local_data/submissions")
    output_dir.mkdir(parents=True, exist_ok=True)
    submission_path = output_dir / f"submission-{uuid4().hex[:8]}.csv"
    audio_files = _candidate_audio_files(max(2, min(payload.sample_count, 20)))
    preview_rows = []
    for index, audio_path in enumerate(audio_files, start=1):
        try:
            result = transcribe_audio(
                audio_path.name,
                str(audio_path),
                language=None,
                detect=True,
                diarize=False,
                domain="kaggle_submission",
                adapter_id=active_adapter["adapter_id"],
                model_name=selected_model,
            )
            transcript = result["normalized_text"]
            language = result["language"]
        except Exception as exc:
            transcript = f"inference_error: {exc}"
            language = "unknown"
        preview_rows.append({
            "audio_id": audio_path.stem or f"anv_test_{index:04d}",
            "transcript": transcript,
            "language": language,
        })

    if not preview_rows:
        preview_rows = [
            {
                "audio_id": f"anv_test_{index:04d}",
                "transcript": "dataset audio not found locally; sync Kaggle dataset before final submission",
                "language": ["swa", "kik", "luo", "som", "mas", "kln"][index % 6],
            }
            for index in range(1, max(2, min(payload.sample_count, 20)) + 1)
        ]
    with submission_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["audio_id", "transcript", "language"])
        writer.writeheader()
        writer.writerows(preview_rows)
    submission = KaggleSubmission(
        model_version_id=model.id,
        dataset_name=payload.dataset_name,
        submission_path=str(submission_path),
        status="ready",
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return {
        "submission_id": submission.id,
        "status": submission.status,
        "model": selected_model,
        "adapter": active_adapter["adapter_id"],
        "dataset_name": payload.dataset_name,
        "submission_path": str(submission_path),
        "preview_rows": preview_rows,
        "validation": {
            "required_columns": ["audio_id", "transcript", "language"],
            "row_count": len(preview_rows),
            "format": "csv",
            "ready_for_download": True,
            "used_real_audio_files": bool(audio_files),
        },
    }
