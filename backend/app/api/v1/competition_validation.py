from fastapi import APIRouter

from app.core.competition_validation import collect_competition_validation, write_competition_validation_reports

router = APIRouter()


@router.get("/status")
def competition_validation_status() -> dict:
    return collect_competition_validation()


@router.post("/run")
def run_competition_validation() -> dict:
    return write_competition_validation_reports()
