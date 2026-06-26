from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.models import Feedback, Transcription


def analytics_summary(db: Session) -> dict:
    total = db.query(func.count(Transcription.id)).scalar() or 0
    low_conf = db.query(func.count(Transcription.id)).filter(Transcription.needs_review.is_(True)).scalar() or 0
    feedback = db.query(func.count(Feedback.id)).scalar() or 0
    avg_ms = db.query(func.avg(Transcription.processing_ms)).scalar() or 0
    rows = (
        db.query(Transcription.language_code, func.count(Transcription.id))
        .group_by(Transcription.language_code)
        .all()
    )

    return {
        "total_transcriptions": total,
        "average_processing_ms": round(float(avg_ms), 2),
        "low_confidence_rate": round(low_conf / total, 4) if total else 0,
        "correction_rate": round(feedback / total, 4) if total else 0,
        "language_distribution": {language or "unknown": count for language, count in rows},
    }

