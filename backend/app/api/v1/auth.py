import base64
import hmac
import json
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.config import get_settings
from app.core.security import hash_password, verify_password
from app.core.time import utc_now
from app.db.models import User, Workspace
from app.db.session import get_db
from app.services.audit_service import log_audit

router = APIRouter()


class AuthPayload(BaseModel):
    email: str
    password: str
    name: str | None = None
    role: str = "Reviewer"


DEFAULT_WORKSPACES = [
    ("Kaggle submission", "Kaggle submission"),
    ("Field recordings", "Field recordings"),
    ("Training data cleanup", "Training data cleanup"),
    ("Review team", "Review team"),
]


def _token(user: User) -> str:
    settings = get_settings()
    secret = settings.auth_secret
    if settings.environment.lower() == "production" and secret == "change-me-local-development-secret":
        raise HTTPException(status_code=500, detail="AUTH_SECRET must be configured for production")
    payload = {
        "sub": user.id,
        "email": user.email,
        "role": user.role,
        "exp": (utc_now() + timedelta(hours=12)).isoformat(),
    }
    raw = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode()
    sig = hmac.new(secret.encode(), raw.encode(), "sha256").hexdigest()
    return f"{raw}.{sig}"


def current_user(authorization: str | None = Header(default=None), db: Session = Depends(get_db)) -> User | None:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.removeprefix("Bearer ").strip()
    try:
        raw, sig = token.rsplit(".", 1)
        expected = hmac.new(get_settings().auth_secret.encode(), raw.encode(), "sha256").hexdigest()
        if not hmac.compare_digest(sig, expected):
            raise ValueError("bad signature")
        payload = json.loads(base64.urlsafe_b64decode(raw.encode()))
        if datetime.fromisoformat(payload["exp"]) < utc_now():
            raise ValueError("expired")
    except Exception as exc:
        raise HTTPException(status_code=401, detail="Invalid or expired token") from exc
    return db.get(User, payload["sub"])


def require_user(user: User | None = Depends(current_user)) -> User:
    if not user:
        raise HTTPException(status_code=401, detail="Sign in required")
    return user


def _ensure_workspaces(db: Session, user: User) -> list[Workspace]:
    existing = db.query(Workspace).filter(Workspace.owner_user_id == user.id).all()
    by_name = {workspace.name: workspace for workspace in existing}
    changed = False
    for name, purpose in DEFAULT_WORKSPACES:
        if name not in by_name:
            workspace = Workspace(owner_user_id=user.id, name=name, purpose=purpose)
            db.add(workspace)
            existing.append(workspace)
            changed = True
    if changed:
        db.commit()
    return db.query(Workspace).filter(Workspace.owner_user_id == user.id).order_by(Workspace.created_at.asc()).all()


def _workspace_response(workspace: Workspace) -> dict:
    return {
        "id": workspace.id,
        "name": workspace.name,
        "purpose": workspace.purpose,
        "created_at": workspace.created_at.isoformat(),
    }


def _user_response(user: User, token: str | None = None, db: Session | None = None) -> dict:
    data = {"id": user.id, "name": user.name, "email": user.email, "role": user.role}
    if db:
        workspaces = _ensure_workspaces(db, user)
        data["workspaces"] = [_workspace_response(workspace) for workspace in workspaces]
        data["active_workspace_id"] = workspaces[0].id if workspaces else None
    if token:
        data["access_token"] = token
        data["token_type"] = "bearer"
    return data


@router.post("/register")
def register(payload: AuthPayload, db: Session = Depends(get_db)) -> dict:
    email = payload.email.strip().lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="Email is already registered")
    user = User(
        name=payload.name or email.split("@")[0],
        email=email,
        password_hash=hash_password(payload.password),
        role=payload.role,
    )
    db.add(user)
    db.flush()
    log_audit(db, action="auth.register", user=user, entity_type="user", entity_id=user.id)
    db.commit()
    db.refresh(user)
    return _user_response(user, _token(user), db)


@router.post("/login")
def login(payload: AuthPayload, db: Session = Depends(get_db)) -> dict:
    user = db.query(User).filter(User.email == payload.email.strip().lower()).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.password_hash.startswith("bcrypt$"):
        user.password_hash = hash_password(payload.password)
    log_audit(db, action="auth.login", user=user, entity_type="user", entity_id=user.id)
    db.commit()
    return _user_response(user, _token(user), db)


@router.get("/me")
def me(user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    return _user_response(user, db=db)
