from sqlalchemy.orm import Session

from app.db.models import Feedback


def add_feedback(
    db: Session,
    transcription_id: str,
    corrected_text: str,
    language: str | None,
    notes: str | None,
) -> Feedback:
    feedback = Feedback(
        transcription_id=transcription_id,
        corrected_text=corrected_text,
        language_code=language,
        notes=notes,
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback

