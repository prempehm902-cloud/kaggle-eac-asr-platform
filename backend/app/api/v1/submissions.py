import csv
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session

from app.config import get_settings
from app.core.competition import (
    ALLOWED_LANGUAGE_CODES,
    COMPETITION_RULES,
    SUBMISSION_COLUMNS,
    hardware_validation_report,
    submission_row,
    validate_submission_rows,
)
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


@router.get("/requirements")
def kaggle_submission_requirements() -> dict:
    return {
        "required_columns": SUBMISSION_COLUMNS,
        "allowed_language_codes": ALLOWED_LANGUAGE_CODES,
        "competition_rules": COMPETITION_RULES,
        "example_row": {"id": "anv_test_0001", "language": "swa", "prediction": "habari yako leo"},
    }


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
    preview_rows: list[dict[str, str]] = []
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
            prediction = result["normalized_text"]
            language = result["language"]
        except Exception as exc:
            prediction = f"inference_error: {exc}"
            language = "swa"
        preview_rows.append(submission_row(audio_path.stem or f"anv_test_{index:04d}", language, prediction))

    if not preview_rows:
        preview_rows = [
            submission_row(
                f"anv_test_{index:04d}",
                ALLOWED_LANGUAGE_CODES[(index - 1) % len(ALLOWED_LANGUAGE_CODES)],
                "dataset audio not found locally; sync Kaggle dataset and run model predictions before final submission",
            )
            for index in range(1, max(2, min(payload.sample_count, 20)) + 1)
        ]

    validation = validate_submission_rows(preview_rows)
    ready_for_competition_upload = validation["ready_for_download"] and bool(audio_files)
    with submission_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=SUBMISSION_COLUMNS, extrasaction="raise")
        writer.writeheader()
        writer.writerows(preview_rows)

    submission = KaggleSubmission(
        model_version_id=model.id,
        dataset_name=payload.dataset_name,
        submission_path=str(submission_path),
        status="ready" if ready_for_competition_upload else "preview_only",
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
            **validation,
            "used_real_audio_files": bool(audio_files),
            "ready_for_competition_upload": ready_for_competition_upload,
            "no_manual_test_transcription": True,
            "final_upload_note": "Sync the Kaggle test dataset before final leaderboard upload." if not audio_files else "Submission was generated from local Kaggle test audio.",
        },
        "hardware_validation_report": hardware_validation_report(selected_model, len(preview_rows)),
        "competition_rules": COMPETITION_RULES,
    }
