from fastapi import Depends, HTTPException

from app.api.v1.auth import require_user
from app.db.models import User


ROLE_PERMISSIONS = {
    "Admin": {
        "view_records",
        "create_records",
        "delete_records",
        "assign_reviews",
        "evaluate_models",
        "export_data",
        "manage_jobs",
        "manage_settings",
        "view_deployment",
    },
    "Reviewer": {
        "view_records",
        "create_records",
        "assign_reviews",
        "evaluate_models",
        "export_data",
        "manage_jobs",
        "view_deployment",
    },
    "Annotator": {
        "view_records",
        "create_records",
        "export_data",
    },
    "Viewer": {
        "view_records",
        "view_deployment",
    },
}


def has_permission(user: User, permission: str) -> bool:
    return permission in ROLE_PERMISSIONS.get(user.role, ROLE_PERMISSIONS["Viewer"])


def require_permission(permission: str):
    def dependency(user: User = Depends(require_user)) -> User:
        if not has_permission(user, permission):
            raise HTTPException(status_code=403, detail=f"{permission} permission required")
        return user

    return dependency
