from time import perf_counter

from app.config import get_settings
from app.core.confidence import needs_review
from app.core.language_id import LANGUAGE_NAMES, detect_language
from app.core.model_adapters import transcribe_with_adapter
from app.core.normalization import normalize_text


SAMPLE_TRANSCRIPTS = {
    "swa": "habari yako leo",
    "kik": "wi mwega umuthi",
    "luo": "idhi nade kawuono",
    "som": "sidee tahay maanta",
    "mas": "supa oleng",
    "kln": "ian komie raini",
}


def transcribe_audio(
    filename: str | None,
    audio_path: str | None = None,
    language: str | None = None,
    detect: bool = True,
    diarize: bool = False,
    domain: str | None = None,
    adapter_id: str | None = None,
    model_name: str | None = None,
) -> dict:
    started = perf_counter()
    language_result = detect_language(filename, language) if detect else {
        "language": language or "swa",
        "confidence": 0.99 if language else 0.60,
        "alternatives": [],
    }

    code = language_result["language"]
    adapter_result = transcribe_with_adapter(
        audio_path or filename or "",
        filename=filename,
        language=language,
        detect=detect,
        diarize=diarize,
        domain=domain,
        adapter_id=adapter_id,
        model_name=model_name,
    )
    if adapter_result:
        code = adapter_result.get("language") or code
        text = adapter_result["text"]
    else:
        text = SAMPLE_TRANSCRIPTS.get(code, SAMPLE_TRANSCRIPTS["swa"])
    if domain:
        text = f"{text}"

    confidence = adapter_result.get("confidence") if adapter_result else min(0.95, max(0.52, language_result["confidence"] - 0.05))
    settings = get_settings()
    review = needs_review(confidence, settings.confidence_threshold)
    processing_ms = int((perf_counter() - started) * 1000)

    return {
        "language": code,
        "language_name": LANGUAGE_NAMES.get(code, code),
        "language_confidence": language_result["confidence"],
        "language_alternatives": language_result["alternatives"],
        "text": text,
        "normalized_text": normalize_text(text),
        "confidence": confidence,
        "needs_review": review,
        "processing_ms": processing_ms,
        "adapter": adapter_id or settings.asr_adapter,
        "segments": adapter_result.get("segments") if adapter_result else [
            {
                "start_sec": 0.0,
                "end_sec": 2.8,
                "text": text,
                "speaker": "SPEAKER_1" if diarize else None,
                "confidence": confidence,
                "needs_review": review,
            }
        ],
    }
