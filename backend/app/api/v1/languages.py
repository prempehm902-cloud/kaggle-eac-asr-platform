from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session

from app.core.language_id import LANGUAGE_NAMES, detect_language
from app.db.seed import seed_reference_data
from app.db.session import get_db

router = APIRouter()


@router.get("")
def list_languages(db: Session = Depends(get_db)) -> list[dict]:
    seed_reference_data(db)
    return [{"code": code, "name": name} for code, name in LANGUAGE_NAMES.items()]


@router.post("/detect")
async def detect(file: UploadFile) -> dict:
    return detect_language(file.filename)

