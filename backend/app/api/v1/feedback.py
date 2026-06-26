from pydantic import BaseModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.feedback_service import add_feedback

router = APIRouter()


class FeedbackRequest(BaseModel):
    transcription_id: str
    corrected_text: str
    language: str | None = None
    notes: str | None = None


@router.post("")
def create_feedback(payload: FeedbackRequest, db: Session = Depends(get_db)) -> dict:
    feedback = add_feedback(
        db,
        payload.transcription_id,
        payload.corrected_text,
        payload.language,
        payload.notes,
    )
    return {"id": feedback.id, "status": "stored"}

