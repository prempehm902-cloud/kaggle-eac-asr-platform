LANGUAGE_CODES = {
    "swahili": "swa",
    "swa": "swa",
    "kikuyu": "kik",
    "gikuyu": "kik",
    "kik": "kik",
    "luo": "luo",
    "dholuo": "luo",
    "luo / dholuo": "luo",
    "somali": "som",
    "som": "som",
    "maasai": "mas",
    "masai": "mas",
    "mas": "mas",
    "kalenjin": "kln",
    "kln": "kln",
}

CANONICAL_LANGUAGE_LABELS = {
    "swa": "Swahili",
    "kik": "Kikuyu",
    "luo": "Luo / Dholuo",
    "som": "Somali",
    "mas": "Maasai",
    "kln": "Kalenjin",
}

SUBMISSION_COLUMNS = ["id", "language", "transcription"]
ALLOWED_LANGUAGE_CODES = list(CANONICAL_LANGUAGE_LABELS.keys())

COMPETITION_RULES = {
    "submission_columns": SUBMISSION_COLUMNS,
    "language_column": "Use ISO 639-3 codes only: swa, kik, luo, som, mas, kln.",
    "team_size_limit": 5,
    "leaderboard_accounts": "One leaderboard account per team.",
    "test_audio_policy": "No manual transcription or human correction of test audio.",
    "open_source_license": "Publish code, training scripts, checkpoints, weights, model cards, and data cards under MIT, Apache-2.0, BSD-3-Clause, MPL-2.0, or another OSI-approved permissive license.",
    "technical_report": "Top 5 teams must provide a short technical report; track winners must publish a detailed blog post or workshop paper.",
    "reproducibility_artifacts": "Organizers may request training logs, checkpoints, hardware specs, and reproducibility evidence.",
    "external_models": "External pretrained models are allowed only when properly cited and license-compatible.",
    "external_tools": "External tools/data must be publicly accessible, free or minimal cost, and reasonably available to all participants.",
    "model_size_limit": "Under 1 billion parameters total.",
    "edge_memory_limit": "Must run inference on edge devices with 8 GB RAM or less.",
    "hardware_report": "Include test-set inference latency and hardware specifications.",
    "governing_law": "Unless otherwise specified, competition rules are governed by the laws of Rwanda.",
}


def normalize_language_code(value: str | None, fallback: str = "swa") -> str:
    key = str(value or "").strip().lower().replace("_", " ").replace("-", " ")
    return LANGUAGE_CODES.get(key, fallback)


def submission_row(sample_id: str, language: str | None, transcription: str | None) -> dict[str, str]:
    return {
        "id": str(sample_id).strip() or "missing_id",
        "language": normalize_language_code(language),
        "transcription": str(transcription or "").strip(),
    }


def validate_submission_rows(rows: list[dict[str, str]]) -> dict:
    violations = []
    for index, row in enumerate(rows, start=1):
        keys = list(row.keys())
        if keys != SUBMISSION_COLUMNS:
            violations.append(f"row {index}: columns must be exactly {SUBMISSION_COLUMNS}, got {keys}")
        if not str(row.get("id", "")).strip():
            violations.append(f"row {index}: id is required")
        if row.get("language") not in ALLOWED_LANGUAGE_CODES:
            violations.append(f"row {index}: language must be one of {ALLOWED_LANGUAGE_CODES}")
        if row.get("transcription") is None:
            violations.append(f"row {index}: transcription is required")
    return {
        "required_columns": SUBMISSION_COLUMNS,
        "allowed_language_codes": ALLOWED_LANGUAGE_CODES,
        "row_count": len(rows),
        "format": "csv",
        "ready_for_download": not violations,
        "violations": violations,
    }


def hardware_validation_report(model_name: str, row_count: int) -> dict:
    estimated_latency_ms = max(180, min(950, 260 + row_count * 18))
    return {
        "model": model_name,
        "parameter_limit": "< 1B parameters",
        "estimated_parameters": "demo adapter: < 1M; replace with trained model card value for final submission",
        "edge_target": "Raspberry Pi 4 / smartphone class device",
        "memory_limit": "<= 8 GB RAM",
        "estimated_peak_memory": "< 512 MB for lightweight demo adapter; validate real model before final upload",
        "latency_report_required": True,
        "estimated_mean_latency_ms_per_file": estimated_latency_ms,
        "status": "requires_real_model_benchmark_before_final_leaderboard_submission",
    }
