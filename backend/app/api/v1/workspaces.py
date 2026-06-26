from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.v1.auth import require_user
from app.db.models import BackgroundJob, ReviewAssignment, TranscriptionOwnership, User, Workspace
from app.db.session import get_db

router = APIRouter()


class WorkspacePayload(BaseModel):
    name: str
    purpose: str = "Kaggle submission"


def workspace_to_dict(workspace: Workspace) -> dict:
    return {
        "id": workspace.id,
        "name": workspace.name,
        "purpose": workspace.purpose,
        "created_at": workspace.created_at.isoformat(),
    }


@router.get("")
def list_workspaces(user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    rows = (
        db.query(Workspace)
        .filter(Workspace.owner_user_id == user.id)
        .order_by(Workspace.created_at.asc())
        .all()
    )
    return {"count": len(rows), "items": [workspace_to_dict(row) for row in rows]}


@router.post("")
def create_workspace(payload: WorkspacePayload, user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="Workspace name is required")
    workspace = Workspace(owner_user_id=user.id, name=name, purpose=payload.purpose.strip() or "Workspace")
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    return workspace_to_dict(workspace)


@router.get("/{workspace_id}/summary")
def workspace_summary(workspace_id: str, user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    workspace = db.get(Workspace, workspace_id)
    if not workspace or workspace.owner_user_id != user.id:
        raise HTTPException(status_code=404, detail="Workspace not found")
    records = db.query(TranscriptionOwnership).filter(TranscriptionOwnership.workspace_id == workspace_id).count()
    jobs = db.query(BackgroundJob).filter(BackgroundJob.workspace_id == workspace_id).count()
    reviews = (
        db.query(ReviewAssignment)
        .join(TranscriptionOwnership, TranscriptionOwnership.transcription_id == ReviewAssignment.transcription_id)
        .filter(TranscriptionOwnership.workspace_id == workspace_id)
        .count()
    )
    return {
        "workspace": workspace_to_dict(workspace),
        "records": records,
        "jobs": jobs,
        "review_assignments": reviews,
    }
