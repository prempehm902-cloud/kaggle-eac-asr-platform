from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.audio import save_upload
from app.core.inference import transcribe_audio
from app.core.translation import translate_text
from app.db.models import AudioUpload, Transcription, TranscriptionSegment
from app.db.seed import seed_reference_data


async def create_transcription(
    db: Session,
    file: UploadFile,
    language: str | None,
    detect_language: bool,
    return_segments: bool,
    diarize: bool,
    translate_to: str | None,
    domain: str | None,
    asr_adapter: str | None = None,
    model_name: str | None = None,
) -> dict:
    model = seed_reference_data(db)
    local_path, digest, size, storage_uri = await save_upload(file)

    upload = AudioUpload(
        original_filename=file.filename,
        content_type=file.content_type,
        storage_uri=storage_uri,
        sha256=digest,
        size_bytes=size,
    )
    db.add(upload)
    db.flush()

    result = transcribe_audio(file.filename, str(local_path), language, detect_language, diarize, domain, asr_adapter, model_name)
    transcription = Transcription(
        audio_upload_id=upload.id,
        model_version_id=model.id,
        language_code=result["language"],
        language_confidence=result["language_confidence"],
        domain=domain,
        raw_text=result["text"],
        normalized_text=result["normalized_text"],
        confidence=result["confidence"],
        needs_review=result["needs_review"],
        processing_ms=result["processing_ms"],
    )
    db.add(transcription)
    db.flush()

    segment_payload = []
    for index, segment in enumerate(result["segments"]):
        db_segment = TranscriptionSegment(
            transcription_id=transcription.id,
            segment_index=index,
            start_sec=segment["start_sec"],
            end_sec=segment["end_sec"],
            text=segment["text"],
            speaker_label=segment["speaker"],
            confidence=segment["confidence"],
            needs_review=segment["needs_review"],
        )
        db.add(db_segment)
        segment_payload.append(segment)

    translation = translate_text(result["language"], translate_to, result["normalized_text"]) if translate_to else None
    db.commit()

    return {
        "id": transcription.id,
        "status": "completed",
        "language": result["language"],
        "language_confidence": result["language_confidence"],
        "language_alternatives": result["language_alternatives"],
        "text": result["text"],
        "normalized_text": result["normalized_text"],
        "translation": translation,
        "duration_sec": 2.8,
        "processing_ms": result["processing_ms"],
        "model": model.name,
        "adapter": result.get("adapter", "mock"),
        "domain": domain,
        "confidence": result["confidence"],
        "needs_review": result["needs_review"],
        "audio_filename": upload.original_filename,
        "audio_content_type": upload.content_type,
        "audio_size_bytes": upload.size_bytes,
        "audio_url": f"/api/v1/transcriptions/{transcription.id}/audio",
        "source_type": "recording" if str(upload.original_filename or "").startswith("recording-") else "upload",
        "created_at": transcription.created_at.isoformat(),
        "segments": segment_payload if return_segments else [],
    }
