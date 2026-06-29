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



def calculate_accuracy_report(samples: list[dict]) -> dict:
    rows = []
    by_language: dict[str, dict] = {}
    total_word_errors = 0
    total_reference_words = 0
    total_char_errors = 0
    total_reference_chars = 0

    for index, sample in enumerate(samples, start=1):
        reference = str(sample.get("reference", ""))
        prediction = str(sample.get("prediction", ""))
        language = str(sample.get("language") or "unknown")
        filename = str(sample.get("filename") or f"sample-{index}")
        score = calculate_wer_cer(reference, prediction)
        accuracy = round(max(0.0, 1.0 - score["wer"]), 4)

        rows.append(
            {
                "filename": filename,
                "language": language,
                "wer": score["wer"],
                "cer": score["cer"],
                "accuracy": accuracy,
                "word_errors": score["word_errors"],
                "reference_words": score["reference_words"],
                "prediction_words": score["prediction_words"],
            }
        )

        bucket = by_language.setdefault(
            language,
            {
                "language": language,
                "samples": 0,
                "word_errors": 0,
                "reference_words": 0,
                "character_errors": 0,
                "reference_characters": 0,
            },
        )
        bucket["samples"] += 1
        bucket["word_errors"] += score["word_errors"]
        bucket["reference_words"] += score["reference_words"]
        bucket["character_errors"] += score["character_errors"]
        bucket["reference_characters"] += max(1, len(" ".join(_tokens(reference))))

        total_word_errors += score["word_errors"]
        total_reference_words += score["reference_words"]
        total_char_errors += score["character_errors"]
        total_reference_chars += max(1, len(" ".join(_tokens(reference))))

    language_summary = []
    for item in by_language.values():
        wer = item["word_errors"] / max(1, item["reference_words"])
        cer = item["character_errors"] / max(1, item["reference_characters"])
        language_summary.append(
            {
                "language": item["language"],
                "samples": item["samples"],
                "wer": round(wer, 4),
                "cer": round(cer, 4),
                "accuracy": round(max(0.0, 1.0 - wer), 4),
            }
        )

    overall_wer = total_word_errors / max(1, total_reference_words)
    overall_cer = total_char_errors / max(1, total_reference_chars)
    return {
        "sample_count": len(rows),
        "overall": {
            "wer": round(overall_wer, 4),
            "cer": round(overall_cer, 4),
            "accuracy": round(max(0.0, 1.0 - overall_wer), 4),
            "word_errors": total_word_errors,
            "reference_words": total_reference_words,
        },
        "by_language": sorted(language_summary, key=lambda item: item["wer"]),
        "samples": rows,
        "guidance": [
            "Use corrected reference transcripts for final scoring.",
            "Track WER per language so high-resource Swahili does not hide weaker Maasai or Kalenjin performance.",
            "Send samples below the confidence threshold or above target WER to human review.",
        ],
    }
