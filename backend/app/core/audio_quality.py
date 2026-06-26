from pathlib import Path


SUPPORTED_EXTENSIONS = {".wav", ".mp3", ".m4a", ".flac", ".ogg", ".webm"}


def inspect_audio(filename: str | None, size_bytes: int) -> dict:
    suffix = Path(filename or "").suffix.lower()
    unsupported = suffix not in SUPPORTED_EXTENSIONS
    empty = size_bytes == 0
    very_small = 0 < size_bytes < 2048

    issues = []
    if unsupported:
        issues.append("unsupported_format")
    if empty:
        issues.append("empty_file")
    if very_small:
        issues.append("very_short_or_silent_audio")

    score = 1.0
    score -= 0.35 if unsupported else 0
    score -= 0.45 if empty else 0
    score -= 0.25 if very_small else 0
    score = max(0.0, round(score, 2))

    return {
        "quality_score": score,
        "supported_format": not unsupported,
        "detected_issues": issues,
        "checks": {
            "format": "fail" if unsupported else "pass",
            "silence": "review" if very_small or empty else "pass",
            "clipping": "not_analyzed_in_mock_runtime",
            "low_volume": "not_analyzed_in_mock_runtime",
            "long_pauses": "not_analyzed_in_mock_runtime",
        },
        "recommendation": "review_before_training" if issues else "ready_for_transcription",
    }
