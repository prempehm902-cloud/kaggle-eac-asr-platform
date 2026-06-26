TRANSLATION_MEMORY = {
    ("swa", "eng", "habari yako leo"): "how are you today",
    ("kik", "eng", "wi mwega umuthi"): "are you well today",
    ("luo", "eng", "idhi nade kawuono"): "how are you today",
    ("som", "eng", "sidee tahay maanta"): "how are you today",
    ("mas", "eng", "supa oleng"): "hello",
    ("kln", "eng", "ian komie raini"): "are you well today",
}


def translate_text(source_language: str | None, target_language: str, text: str) -> dict:
    key = (source_language or "swa", target_language, text.lower().strip())
    translated = TRANSLATION_MEMORY.get(key, f"[{target_language}] {text}")
    return {
        "target_language": target_language,
        "text": translated,
        "confidence": 0.72,
        "model": "mock-translation-v0",
    }

