import re


def _tokens(text: str) -> list[str]:
    text = re.sub(r"[^\w\s']", " ", text.lower())
    return [token for token in text.split() if token]


def _edit_distance(reference: list[str], hypothesis: list[str]) -> int:
    rows = len(reference) + 1
    cols = len(hypothesis) + 1
    table = [[0] * cols for _ in range(rows)]

    for row in range(rows):
        table[row][0] = row
    for col in range(cols):
        table[0][col] = col

    for row in range(1, rows):
        for col in range(1, cols):
            cost = 0 if reference[row - 1] == hypothesis[col - 1] else 1
            table[row][col] = min(
                table[row - 1][col] + 1,
                table[row][col - 1] + 1,
                table[row - 1][col - 1] + cost,
            )
    return table[-1][-1]


def calculate_wer_cer(reference: str, prediction: str) -> dict:
    ref_words = _tokens(reference)
    hyp_words = _tokens(prediction)
    word_errors = _edit_distance(ref_words, hyp_words)

    ref_chars = list(" ".join(ref_words))
    hyp_chars = list(" ".join(hyp_words))
    char_errors = _edit_distance(ref_chars, hyp_chars)

    return {
        "wer": round(word_errors / max(1, len(ref_words)), 4),
        "cer": round(char_errors / max(1, len(ref_chars)), 4),
        "reference_words": len(ref_words),
        "prediction_words": len(hyp_words),
        "word_errors": word_errors,
        "character_errors": char_errors,
    }
