from fastapi import APIRouter, File, Form, UploadFile
from pydantic import BaseModel

from app.core.audio_quality import inspect_audio
from app.core.wer import calculate_accuracy_report, calculate_wer_cer

router = APIRouter()


class WerRequest(BaseModel):
    reference: str
    prediction: str


class AccuracySample(BaseModel):
    reference: str
    prediction: str
    language: str = "unknown"
    filename: str | None = None


class AccuracyRequest(BaseModel):
    samples: list[AccuracySample]


class VocabularyRequest(BaseModel):
    domain: str
    phrases: list[str]


@router.get("/model-comparison")
def model_comparison() -> dict:
    return {
        "models": [
            {
                "name": "baseline-whisper-small",
                "runtime": "PyTorch",
                "wer": 0.384,
                "latency_ms": 920,
                "memory_mb": 1800,
                "model_size_mb": 967,
                "mode": "server",
            },
            {
                "name": "afrivoice-finetuned-small",
                "runtime": "PyTorch",
                "wer": 0.247,
                "latency_ms": 760,
                "memory_mb": 1900,
                "model_size_mb": 980,
                "mode": "server",
            },
            {
                "name": "afrivoice-edge-int8",
                "runtime": "CTranslate2 int8",
                "wer": 0.281,
                "latency_ms": 430,
                "memory_mb": 640,
                "model_size_mb": 244,
                "mode": "offline_edge",
            },
        ],
        "winner": "afrivoice-finetuned-small",
        "edge_recommendation": "afrivoice-edge-int8",
    }


@router.get("/leaderboard")
def leaderboard() -> dict:
    return {
        "metric": "WER",
        "languages": [
            {"code": "swa", "name": "Swahili", "wer": 0.18, "hours": 450.2, "rank": 1},
            {"code": "som", "name": "Somali", "wer": 0.23, "hours": 78.5, "rank": 2},
            {"code": "luo", "name": "Luo / Dholuo", "wer": 0.27, "hours": 66.1, "rank": 3},
            {"code": "kik", "name": "Kikuyu", "wer": 0.29, "hours": 61.4, "rank": 4},
            {"code": "kln", "name": "Kalenjin", "wer": 0.34, "hours": 42.7, "rank": 5},
            {"code": "mas", "name": "Maasai", "wer": 0.39, "hours": 31.9, "rank": 6},
        ],
        "worst_language_focus": "mas",
    }


@router.post("/audio-quality")
async def audio_quality(file: UploadFile = File(...)) -> dict:
    data = await file.read()
    return inspect_audio(file.filename, len(data))


@router.get("/dataset-audit")
def dataset_audit() -> dict:
    return {
        "total_hours": 730.8,
        "speakers": 1842,
        "languages": 6,
        "domains": ["health", "agriculture", "education", "government", "finance", "everyday"],
        "scripted_hours": 438.6,
        "unscripted_hours": 292.2,
        "missing_transcripts": 17,
        "corrupt_files": 4,
        "language_breakdown": {
            "swa": {"hours": 450.2, "speakers": 940},
            "kik": {"hours": 61.4, "speakers": 175},
            "luo": {"hours": 66.1, "speakers": 198},
            "som": {"hours": 78.5, "speakers": 216},
            "mas": {"hours": 31.9, "speakers": 146},
            "kln": {"hours": 42.7, "speakers": 167},
        },
    }


@router.post("/wer")
def wer(payload: WerRequest) -> dict:
    return calculate_wer_cer(payload.reference, payload.prediction)


@router.post("/accuracy")
def accuracy(payload: AccuracyRequest) -> dict:
    samples = [sample.model_dump() for sample in payload.samples]
    return calculate_accuracy_report(samples)


@router.get("/offline-status")
def offline_status() -> dict:
    return {
        "current_mode": "server_mock",
        "available_modes": [
            {"mode": "server", "status": "ready", "model": "mock-afrivoice-asr-v0"},
            {"mode": "local_edge", "status": "planned", "model": "afrivoice-edge-int8"},
            {"mode": "offline_cli", "status": "ready", "entrypoint": "backend/edge/cli/afrivoice.py"},
        ],
    }


@router.get("/activity-detail")
def activity_detail() -> dict:
    return {
        "summary": {
            "views": {"value": 35, "note": "35 in the last 30 days", "trend": "up"},
            "downloads": {"value": 2, "note": "2 in the last 30 days", "trend": "up"},
            "engagement": {"value": 0.05714, "note": "downloads per view", "trend": "steady"},
            "comments": {"value": 0, "note": "posted", "trend": "flat"},
            "contributors": {"value": "No Data", "note": "top contributors", "trend": "flat"},
        },
        "detail": {
            "range": "Last month",
            "views": [
                {"date": "06/10", "value": 2},
                {"date": "06/11", "value": 4},
                {"date": "06/12", "value": 2},
                {"date": "06/13", "value": 1},
                {"date": "06/14", "value": 1},
                {"date": "06/15", "value": 25},
            ],
            "downloads": [
                {"date": "06/10", "value": 0},
                {"date": "06/11", "value": 0},
                {"date": "06/12", "value": 0},
                {"date": "06/13", "value": 2},
                {"date": "06/14", "value": 0},
                {"date": "06/15", "value": 0},
            ],
        },
    }


@router.get("/backend-status")
def backend_status() -> dict:
    return {
        "environment": "local-development",
        "release": "0.1.0",
        "services": [
            {"name": "FastAPI Gateway", "status": "healthy", "latency_ms": 18},
            {"name": "ASR Runtime", "status": "online", "latency_ms": 430},
            {"name": "Language ID", "status": "online", "latency_ms": 42},
            {"name": "Feedback Store", "status": "healthy", "latency_ms": 9},
            {"name": "Edge Export Worker", "status": "standby", "latency_ms": None},
        ],
        "pipeline": [
            {"stage": "Audio ingest", "state": "ready"},
            {"stage": "Quality check", "state": "ready"},
            {"stage": "Language detection", "state": "ready"},
            {"stage": "ASR inference", "state": "mock-runtime"},
            {"stage": "Transcript persistence", "state": "ready"},
            {"stage": "Human correction loop", "state": "ready"},
        ],
        "capacity": {
            "queued_jobs": 0,
            "active_workers": 1,
            "storage_mode": "local-sqlite",
            "offline_package": "scaffolded",
        },
    }


@router.post("/vocabulary")
def vocabulary(payload: VocabularyRequest) -> dict:
    cleaned = sorted({phrase.strip() for phrase in payload.phrases if phrase.strip()})
    return {
        "domain": payload.domain,
        "phrases_added": cleaned,
        "count": len(cleaned),
        "status": "phrase_boosting_ready_for_decoder_integration",
    }
