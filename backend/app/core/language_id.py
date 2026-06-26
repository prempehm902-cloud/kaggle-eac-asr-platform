LANGUAGE_NAMES = {
    "swa": "Swahili",
    "kik": "Kikuyu",
    "luo": "Luo / Dholuo",
    "som": "Somali",
    "mas": "Maasai",
    "kln": "Kalenjin",
}


def detect_language(filename: str | None, requested_language: str | None = None) -> dict:
    if requested_language in LANGUAGE_NAMES:
        return {
            "language": requested_language,
            "confidence": 0.99,
            "alternatives": [{"language": requested_language, "confidence": 0.99}],
        }

    name = (filename or "").lower()
    for code in LANGUAGE_NAMES:
        if code in name:
            return {
                "language": code,
                "confidence": 0.86,
                "alternatives": [
                    {"language": code, "confidence": 0.86},
                    {"language": "swa", "confidence": 0.08},
                    {"language": "luo", "confidence": 0.06},
                ],
            }

    return {
        "language": "swa",
        "confidence": 0.62,
        "alternatives": [
            {"language": "swa", "confidence": 0.62},
            {"language": "kik", "confidence": 0.14},
            {"language": "luo", "confidence": 0.12},
            {"language": "som", "confidence": 0.05},
            {"language": "mas", "confidence": 0.04},
            {"language": "kln", "confidence": 0.03},
        ],
    }

