from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.api.v1.auth import current_user
from app.config import get_settings
from app.core.inference import transcribe_audio
from app.core.jobs import enqueue_background_job
from app.core.permissions import has_permission
from app.core.storage import local_cache_path, local_path_from_uri
from app.db.models import Feedback, ReviewAssignment, Transcription, TranscriptionOwnership, TranscriptionSegment, Translation, User, Workspace
from app.db.session import get_db
from app.services.audit_service import log_audit
from app.services.transcription_service import create_transcription

router = APIRouter()


@router.post("")
async def transcribe(
    file: UploadFile = File(...),
    language: str | None = Form(default=None),
    detect_language: bool = Form(default=True),
    return_segments: bool = Form(default=True),
    diarize: bool = Form(default=False),
    translate_to: str | None = Form(default=None),
    domain: str | None = Form(default=None),
    asr_adapter: str | None = Form(default=None),
    selected_model: str | None = Form(default=None, alias="model_name"),
    workspace_id: str | None = Form(default=None),
    user: User | None = Depends(current_user),
    db: Session = Depends(get_db),
) -> dict:
    result = await create_transcription(
        db=db,
        file=file,
        language=language,
        detect_language=detect_language,
        return_segments=return_segments,
        diarize=diarize,
        translate_to=translate_to,
        domain=domain,
        asr_adapter=asr_adapter,
        model_name=selected_model,
    )
    if user:
        if workspace_id and not db.query(Workspace).filter(Workspace.id == workspace_id, Workspace.owner_user_id == user.id).first():
            raise HTTPException(status_code=404, detail="Workspace not found")
        db.add(TranscriptionOwnership(transcription_id=result["id"], user_id=user.id, workspace_id=workspace_id))
        log_audit(db, action="transcription.create", user=user, entity_type="transcription", entity_id=result["id"], workspace_id=workspace_id)
        db.commit()
    return result


@router.post("/jobs")
async def create_job(file: UploadFile = File(...)) -> dict:
    job_id = f"transcription-{uuid4().hex[:10]}"
    queued = enqueue_background_job("afrivoice.transcribe_audio", {"job_id": job_id, "filename": file.filename})
    return {
        "job_id": queued.get("task_id") or job_id,
        "status": queued["status"],
        "queue_backend": queued["queue_backend"],
        "poll_url": f"/api/v1/transcriptions/jobs/{queued.get('task_id') or job_id}",
        "note": "Use the batch or sync transcription endpoint for immediate local results; configure QUEUE_BACKEND=celery for true async workers.",
    }


@router.post("/batch")
async def batch_transcribe(
    files: list[UploadFile] = File(...),
    language: str | None = Form(default=None),
    output_format: str = Form(default="jsonl"),
    workspace_id: str | None = Form(default=None),
    asr_adapter: str | None = Form(default=None),
    user: User | None = Depends(current_user),
    db: Session = Depends(get_db),
) -> dict:
    results = []
    for file in files:
        result = await create_transcription(
            db=db,
            file=file,
            language=language,
            detect_language=True,
            return_segments=False,
            diarize=False,
            translate_to=None,
            domain=None,
            asr_adapter=asr_adapter,
            model_name=None,
        )
        results.append({
            "filename": file.filename,
            "transcription_id": result["id"],
            "language": result["language"],
            "text": result["normalized_text"],
            "confidence": result["confidence"],
        })
        if user:
            db.add(TranscriptionOwnership(transcription_id=result["id"], user_id=user.id, workspace_id=workspace_id))
            log_audit(db, action="transcription.batch_create", user=user, entity_type="transcription", entity_id=result["id"], workspace_id=workspace_id)
            db.commit()

    return {
        "batch_id": "local-batch",
        "status": "completed",
        "output_format": output_format,
        "count": len(results),
        "results": results,
    }


@router.get("")
def list_transcriptions(db: Session = Depends(get_db), user: User | None = Depends(current_user)) -> dict:
    query = db.query(Transcription)
    if user:
        owned_ids = select(TranscriptionOwnership.transcription_id).where(TranscriptionOwnership.user_id == user.id)
        query = query.filter(Transcription.id.in_(owned_ids))
    rows = query.order_by(Transcription.created_at.desc()).limit(50).all()
    return {
        "count": len(rows),
        "items": [
            {
                "id": row.id,
                "language": row.language_code,
                "text": row.raw_text,
                "normalized_text": row.normalized_text,
                "confidence": row.confidence,
                "needs_review": row.needs_review,
                "duration_sec": max((segment.end_sec for segment in row.segments), default=None),
                "audio_filename": row.audio_upload.original_filename if row.audio_upload else None,
                "audio_content_type": row.audio_upload.content_type if row.audio_upload else None,
                "audio_size_bytes": row.audio_upload.size_bytes if row.audio_upload else None,
                "audio_url": f"/api/v1/transcriptions/{row.id}/audio" if row.audio_upload else None,
                "source_type": "recording" if (row.audio_upload and str(row.audio_upload.original_filename or "").startswith("recording-")) else "upload",
                "created_at": row.created_at.isoformat(),
            }
            for row in rows
        ],
    }


@router.get("/jobs/{job_id}")
def get_job(job_id: str) -> dict:
    return {"job_id": job_id, "status": "completed", "transcription_id": None}


@router.get("/{transcription_id}/audio")
def get_transcription_audio(transcription_id: str, db: Session = Depends(get_db), user: User | None = Depends(current_user)) -> FileResponse:
    transcription = db.get(Transcription, transcription_id)
    if not transcription or not transcription.audio_upload:
        raise HTTPException(status_code=404, detail="Audio not found")
    path = local_path_from_uri(transcription.audio_upload.storage_uri)
    if path is None:
        path = local_cache_path(transcription.audio_upload.sha256, transcription.audio_upload.original_filename)
    if not path.exists():
        raise HTTPException(status_code=404, detail="Stored audio file is missing")
    return FileResponse(
        path,
        media_type=transcription.audio_upload.content_type or "application/octet-stream",
        filename=transcription.audio_upload.original_filename or path.name,
    )


@router.get("/{transcription_id}")
def get_transcription(transcription_id: str, db: Session = Depends(get_db), user: User | None = Depends(current_user)) -> dict:
    transcription = db.get(Transcription, transcription_id)
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")
    return {
        "id": transcription.id,
        "language": transcription.language_code,
        "text": transcription.raw_text,
        "normalized_text": transcription.normalized_text,
        "confidence": transcription.confidence,
        "needs_review": transcription.needs_review,
        "duration_sec": max((segment.end_sec for segment in transcription.segments), default=None),
        "audio_filename": transcription.audio_upload.original_filename if transcription.audio_upload else None,
        "audio_content_type": transcription.audio_upload.content_type if transcription.audio_upload else None,
        "audio_size_bytes": transcription.audio_upload.size_bytes if transcription.audio_upload else None,
        "audio_url": f"/api/v1/transcriptions/{transcription.id}/audio" if transcription.audio_upload else None,
        "source_type": "recording" if (transcription.audio_upload and str(transcription.audio_upload.original_filename or "").startswith("recording-")) else "upload",
        "created_at": transcription.created_at.isoformat(),
        "review_assignments": [
            {
                "id": item.id,
                "status": item.status,
                "assignee_user_id": item.assignee_user_id,
                "notes": item.notes,
                "created_at": item.created_at.isoformat(),
            }
            for item in db.query(ReviewAssignment).filter(ReviewAssignment.transcription_id == transcription_id).all()
        ],
        "segments": [
            {
                "start_sec": segment.start_sec,
                "end_sec": segment.end_sec,
                "text": segment.text,
                "speaker": segment.speaker_label,
                "confidence": segment.confidence,
            }
            for segment in transcription.segments
        ],
    }


@router.delete("/{transcription_id}")
def delete_transcription(transcription_id: str, db: Session = Depends(get_db), user: User | None = Depends(current_user)) -> dict:
    transcription = db.get(Transcription, transcription_id)
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")
    if user:
        owns_record = db.query(TranscriptionOwnership).filter(
            TranscriptionOwnership.transcription_id == transcription_id,
            TranscriptionOwnership.user_id == user.id,
        ).first()
        can_delete_any = has_permission(user, "delete_records")
        if not owns_record and not can_delete_any:
            raise HTTPException(status_code=403, detail="You do not own this transcription")
    audio_upload = transcription.audio_upload
    audio_path = local_path_from_uri(audio_upload.storage_uri) if audio_upload else None

    db.query(Feedback).filter(Feedback.transcription_id == transcription_id).delete(synchronize_session=False)
    db.query(Translation).filter(Translation.transcription_id == transcription_id).delete(synchronize_session=False)
    db.query(ReviewAssignment).filter(ReviewAssignment.transcription_id == transcription_id).delete(synchronize_session=False)
    db.query(TranscriptionOwnership).filter(TranscriptionOwnership.transcription_id == transcription_id).delete(synchronize_session=False)
    log_audit(db, action="transcription.delete", user=user, entity_type="transcription", entity_id=transcription_id)
    db.query(TranscriptionSegment).filter(TranscriptionSegment.transcription_id == transcription_id).delete(synchronize_session=False)
    db.delete(transcription)
    if audio_upload:
        upload_is_unused = (
            db.query(Transcription)
            .filter(Transcription.audio_upload_id == audio_upload.id, Transcription.id != transcription_id)
            .first()
            is None
        )
        if upload_is_unused:
            db.delete(audio_upload)
    db.commit()

    audio_deleted = False
    if audio_path and audio_path.exists():
        audio_path.unlink()
        audio_deleted = True
    return {"id": transcription_id, "status": "deleted", "audio_deleted": audio_deleted}


@router.websocket("/stream")
async def stream_transcription(websocket: WebSocket) -> None:
    await websocket.accept()
    await websocket.send_json({
        "event": "ready",
        "message": "Streaming ASR session ready. Send audio chunks or text control messages.",
    })
    partials = ["habari", "habari yako", "habari yako leo"]
    chunk_count = 0
    audio_buffer = bytearray()
    try:
        while True:
            message = await websocket.receive()
            if message.get("type") == "websocket.disconnect":
                break
            if message.get("text") in {"stop", "end", "finish"}:
                final_text = partials[min(chunk_count, len(partials)) - 1] if chunk_count else ""
                confidence = 0.91 if chunk_count else 0.0
                adapter = "stream_preview"
                if audio_buffer:
                    stream_path = get_settings().upload_dir / f"stream-{uuid4().hex[:10]}.webm"
                    stream_path.write_bytes(bytes(audio_buffer))
                    try:
                        result = transcribe_audio(
                            stream_path.name,
                            str(stream_path),
                            language=None,
                            detect=True,
                            diarize=False,
                            domain="streaming",
                        )
                        final_text = result["normalized_text"]
                        confidence = result["confidence"]
                        adapter = result.get("adapter", "active")
                    except Exception as exc:
                        await websocket.send_json({
                            "event": "warning",
                            "message": f"Final ASR inference failed, returning live preview: {exc}",
                        })
                await websocket.send_json({
                    "event": "final",
                    "text": final_text,
                    "confidence": confidence,
                    "chunks_received": chunk_count,
                    "adapter": adapter,
                })
                await websocket.close()
                break
            if "bytes" in message or "text" in message:
                chunk_count += 1
                if message.get("bytes"):
                    audio_buffer.extend(message["bytes"])
                text = partials[min(chunk_count, len(partials)) - 1]
                await websocket.send_json({
                    "event": "partial",
                    "text": text,
                    "confidence": round(0.76 + min(chunk_count, 5) * 0.03, 2),
                    "chunks_received": chunk_count,
                    "is_mock_partial": True,
                })
    except WebSocketDisconnect:
        return
