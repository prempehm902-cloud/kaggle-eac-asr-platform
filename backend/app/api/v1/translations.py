from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.translation import translate_text
from app.db.models import Transcription, Translation
from app.db.session import get_db

router = APIRouter()


class TranslationRequest(BaseModel):
    transcription_id: str
    target_language: str = "eng"


@router.post("")
def translate(payload: TranslationRequest, db: Session = Depends(get_db)) -> dict:
    transcription = db.get(Transcription, payload.transcription_id)
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")
    result = translate_text(
        transcription.language_code,
        payload.target_language,
        transcription.normalized_text,
    )
    record = Translation(
        transcription_id=transcription.id,
        source_language_code=transcription.language_code,
        target_language_code=payload.target_language,
        source_text=transcription.normalized_text,
        translated_text=result["text"],
        confidence=result["confidence"],
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return {
        "id": record.id,
        "source_language": transcription.language_code,
        "target_language": payload.target_language,
        "source_text": transcription.normalized_text,
        "translated_text": result["text"],
        "model": result["model"],
    }

