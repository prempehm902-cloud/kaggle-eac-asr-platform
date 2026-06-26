from sqlalchemy.orm import Session

from app.db.models import AuditLog, User


def log_audit(
    db: Session,
    *,
    action: str,
    user: User | None = None,
    entity_type: str | None = None,
    entity_id: str | None = None,
    workspace_id: str | None = None,
    detail: str | None = None,
) -> None:
    db.add(
        AuditLog(
            user_id=user.id if user else None,
            workspace_id=workspace_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            detail=detail,
        )
    )
