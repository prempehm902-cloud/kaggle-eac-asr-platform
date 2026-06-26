from dataclasses import dataclass
from importlib.util import find_spec
from pathlib import Path

from app.config import get_settings


@dataclass(frozen=True)
class ModelAdapter:
    id: str
    name: str
    runtime: str
    status: str
    install_hint: str
    best_for: str
    default_model: str


MODEL_ADAPTERS = [
    ModelAdapter(
        id="mock",
        name="Mock AfriVoice ASR",
        runtime="local-python",
        status="active",
        install_hint="No install required",
        best_for="offline demos, API validation, UI testing",
        default_model="mock-afrivoice-asr-v0",
    ),
    ModelAdapter(
        id="whisper",
        name="OpenAI Whisper",
        runtime="pytorch",
        status="available_adapter",
        install_hint="pip install openai-whisper",
        best_for="strong multilingual baseline",
        default_model="small",
    ),
    ModelAdapter(
        id="faster_whisper",
        name="faster-whisper",
        runtime="ctranslate2",
        status="available_adapter",
        install_hint="pip install faster-whisper",
        best_for="low-latency CPU/GPU inference",
        default_model="small",
    ),
    ModelAdapter(
        id="wav2vec2",
        name="Wav2Vec2 / XLS-R",
        runtime="transformers",
        status="available_adapter",
        install_hint="pip install transformers torchaudio",
        best_for="fine-tuned low-resource language models",
        default_model="facebook/wav2vec2-large-xlsr-53",
    ),
    ModelAdapter(
        id="hf_finetuned",
        name="Fine-tuned Hugging Face AfriVoice model",
        runtime="transformers",
        status="planned_training_target",
        install_hint="pip install transformers datasets accelerate",
        best_for="challenge-specific unified ASR model",
        default_model="DigitalUmuganda/afrivoice-finetuned",
    ),
]

_ACTIVE_ADAPTER = {"adapter_id": get_settings().asr_adapter, "model_name": get_settings().model_name}


def _dependency_status(adapter_id: str) -> tuple[str, str]:
    requirements = {
        "mock": [],
        "whisper": ["whisper"],
        "faster_whisper": ["faster_whisper"],
        "wav2vec2": ["transformers"],
        "hf_finetuned": ["transformers"],
    }
    missing = [package for package in requirements.get(adapter_id, []) if find_spec(package) is None]
    if missing:
        return "needs_dependency", f"Missing Python package(s): {', '.join(missing)}"
    return "ready", "Runtime dependency is available."


def list_model_adapters() -> list[dict]:
    active_id = get_active_adapter()["adapter_id"]
    items = []
    for adapter in MODEL_ADAPTERS:
        dependency_status, runtime_note = _dependency_status(adapter.id)
        status = "active" if adapter.id == active_id else dependency_status
        items.append({**adapter.__dict__, "status": status, "runtime_note": runtime_note})
    return items


def get_model_adapter(adapter_id: str) -> dict:
    for adapter in MODEL_ADAPTERS:
        if adapter.id == adapter_id:
            return adapter.__dict__
    return MODEL_ADAPTERS[0].__dict__


def set_active_adapter(adapter_id: str, model_name: str | None = None) -> dict:
    adapter = get_model_adapter(adapter_id)
    _ACTIVE_ADAPTER["adapter_id"] = adapter["id"]
    _ACTIVE_ADAPTER["model_name"] = model_name or adapter["default_model"]
    dependency_status, runtime_note = _dependency_status(adapter["id"])
    return {
        **adapter,
        "status": "active",
        "dependency_status": dependency_status,
        "runtime_note": runtime_note,
        "model_name": _ACTIVE_ADAPTER["model_name"],
    }


def get_active_adapter() -> dict:
    adapter = get_model_adapter(_ACTIVE_ADAPTER["adapter_id"])
    dependency_status, runtime_note = _dependency_status(adapter["id"])
    return {
        **adapter,
        "adapter_id": adapter["id"],
        "dependency_status": dependency_status,
        "runtime_note": runtime_note,
        "model_name": _ACTIVE_ADAPTER["model_name"],
    }


def transcribe_with_adapter(
    audio_path: str | Path,
    *,
    filename: str | None,
    language: str | None,
    detect: bool,
    diarize: bool,
    domain: str | None,
    adapter_id: str | None = None,
    model_name: str | None = None,
) -> dict | None:
    adapter_id = adapter_id or get_active_adapter()["adapter_id"]
    if adapter_id == "mock":
        return None

    if adapter_id == "whisper":
        try:
            import whisper
        except ImportError as exc:
            raise RuntimeError("Install openai-whisper or set ASR_ADAPTER=mock") from exc
        model = whisper.load_model(model_name or get_active_adapter()["model_name"] or "small")
        result = model.transcribe(str(audio_path), language=language if not detect else None)
        text = result.get("text", "").strip()
        return {
            "text": text,
            "normalized_text": text.lower(),
            "language": language or result.get("language") or "swa",
            "confidence": 0.82,
            "segments": [
                {
                    "start_sec": segment.get("start", 0.0),
                    "end_sec": segment.get("end", 0.0),
                    "text": segment.get("text", "").strip(),
                    "speaker": "SPEAKER_1" if diarize else None,
                    "confidence": 0.82,
                    "needs_review": False,
                }
                for segment in result.get("segments", [])
            ],
        }

    if adapter_id == "faster_whisper":
        try:
            from faster_whisper import WhisperModel
        except ImportError as exc:
            raise RuntimeError("Install faster-whisper or set ASR_ADAPTER=mock") from exc
        model = WhisperModel(model_name or get_active_adapter()["model_name"] or "small", device="cpu", compute_type="int8")
        segments, info = model.transcribe(str(audio_path), language=language if not detect else None)
        segment_list = list(segments)
        text = " ".join(segment.text.strip() for segment in segment_list).strip()
        return {
            "text": text,
            "normalized_text": text.lower(),
            "language": language or info.language or "swa",
            "confidence": float(getattr(info, "language_probability", 0.82) or 0.82),
            "segments": [
                {
                    "start_sec": segment.start,
                    "end_sec": segment.end,
                    "text": segment.text.strip(),
                    "speaker": "SPEAKER_1" if diarize else None,
                    "confidence": 0.82,
                    "needs_review": False,
                }
                for segment in segment_list
            ],
        }

    if adapter_id in {"wav2vec2", "hf_finetuned"}:
        try:
            from transformers import pipeline
        except ImportError as exc:
            raise RuntimeError("Install transformers and torchaudio or set ASR_ADAPTER=mock") from exc
        recognizer = pipeline("automatic-speech-recognition", model=model_name or get_active_adapter()["model_name"])
        result = recognizer(str(audio_path))
        text = result["text"].strip()
        return {
            "text": text,
            "normalized_text": text.lower(),
            "language": language or "swa",
            "confidence": 0.80,
            "segments": [{
                "start_sec": 0.0,
                "end_sec": 0.0,
                "text": text,
                "speaker": "SPEAKER_1" if diarize else None,
                "confidence": 0.80,
                "needs_review": False,
            }],
        }

    return None
