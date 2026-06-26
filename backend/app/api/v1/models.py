from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.seed import seed_reference_data
from app.db.session import get_db

router = APIRouter()


@router.get("/active")
def active_model(db: Session = Depends(get_db)) -> dict:
    model = seed_reference_data(db)
    return {
        "name": model.name,
        "architecture": model.architecture,
        "version": model.version,
        "languages": ["swa", "kik", "luo", "som", "mas", "kln"],
        "quantized": model.quantized,
        "runtime": model.runtime,
    }

