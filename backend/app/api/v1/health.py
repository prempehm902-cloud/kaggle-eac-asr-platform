from fastapi import APIRouter

from app.config import get_settings

router = APIRouter()


@router.get("/health")
def health() -> dict:
    settings = get_settings()
    return {
        "status": "ok",
        "model_loaded": True,
        "active_model": settings.model_name,
        "runtime": settings.model_runtime,
    }

