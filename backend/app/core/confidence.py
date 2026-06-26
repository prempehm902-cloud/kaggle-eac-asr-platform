def needs_review(confidence: float | None, threshold: float) -> bool:
    return confidence is None or confidence < threshold

