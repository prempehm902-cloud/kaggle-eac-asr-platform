from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.permissions import require_permission
from app.db.models import AuditLog, User
from app.db.session import get_db

router = APIRouter()


@router.get("")
def list_audit_logs(user: User = Depends(require_permission("view_deployment")), db: Session = Depends(get_db)) -> dict:
    rows = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(100).all()
    return {
        "count": len(rows),
        "items": [
            {
                "id": row.id,
                "user_id": row.user_id,
                "workspace_id": row.workspace_id,
                "action": row.action,
                "entity_type": row.entity_type,
                "entity_id": row.entity_id,
                "detail": row.detail,
                "created_at": row.created_at.isoformat(),
            }
            for row in rows
        ],
    }
