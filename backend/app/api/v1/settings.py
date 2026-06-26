from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.config import get_settings
from app.core.permissions import require_permission
from app.db.models import ProjectSetting, User
from app.db.session import get_db
from app.services.audit_service import log_audit

router = APIRouter()


class SettingsPayload(BaseModel):
    api_keys_configured: bool | None = None
    default_model: str | None = None
    default_workspace: str | None = None
    dataset_path: str | None = None
    export_format: str | None = None
    notifications: str | None = None


DEFAULTS = {
    "api_keys_configured": "false",
    "default_model": "mock",
    "default_workspace": "Kaggle submission",
    "dataset_path": "outputs/local_data",
    "export_format": "json",
    "notifications": "toast",
}


def _read_settings(db: Session) -> dict:
    rows = {row.key: row.value for row in db.query(ProjectSetting).all()}
    return {**DEFAULTS, **rows}


@router.get("")
def read_settings(user: User = Depends(require_permission("view_deployment")), db: Session = Depends(get_db)) -> dict:
    settings = get_settings()
    values = _read_settings(db)
    return {
        "project": values,
        "runtime": {
            "environment": settings.environment,
            "model_runtime": settings.model_runtime,
            "asr_adapter": settings.asr_adapter,
            "storage_backend": settings.storage_backend,
            "queue_backend": settings.queue_backend,
            "auth_secret_configured": settings.auth_secret != "change-me-local-development-secret",
        },
    }


@router.patch("")
def update_settings(payload: SettingsPayload, user: User = Depends(require_permission("manage_settings")), db: Session = Depends(get_db)) -> dict:
    updates = {key: value for key, value in payload.model_dump().items() if value is not None}
    for key, value in updates.items():
        row = db.get(ProjectSetting, key) or ProjectSetting(key=key, value="")
        row.value = str(value).lower() if isinstance(value, bool) else str(value)
        row.updated_by_user_id = user.id
        db.merge(row)
    log_audit(db, action="settings.update", user=user, entity_type="project_settings", detail=", ".join(updates.keys()))
    db.commit()
    return {"status": "saved", "project": _read_settings(db)}
