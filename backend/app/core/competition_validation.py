import csv
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from app.core.competition import ALLOWED_LANGUAGE_CODES, COMPETITION_RULES, SUBMISSION_COLUMNS

PROJECT_ROOT = Path(__file__).resolve().parents[3]
PERMISSIVE_LICENSES = {"mit", "apache-2.0", "bsd-3-clause", "mpl-2.0"}

AFRIVOICES_DATASET_SUMMARY = {
    "source": "AfriVoices East Africa dataset",
    "license": "CC BY 4.0 for Kaggle test dataset package as documented by the data page",
    "languages": [
        {"language": "Swahili", "iso_code": "swa", "dialects": "Swahili-English Nairobi/Kisii/Wajir/Mombasa/Nakuru; Swahili Tanzania Dar-es-Salaam", "read_hours": 0, "spontaneous_hours": 2979, "total_hours": 2979},
        {"language": "Kikuyu", "iso_code": "kik", "dialects": "Gi-Kabete, Ki-Mathira, Ki-Muranga, Ki-Ndia, Gi-Gichugu", "read_hours": 183, "spontaneous_hours": 571, "total_hours": 754},
        {"language": "Luo / Dholuo", "iso_code": "luo", "dialects": "Nyandwat, Milambo", "read_hours": 195, "spontaneous_hours": 528, "total_hours": 723},
        {"language": "Somali", "iso_code": "som", "dialects": "Maxatire, Mogadishu", "read_hours": 118, "spontaneous_hours": 884, "total_hours": 1002},
        {"language": "Kalenjin", "iso_code": "kln", "dialects": "Nandi, Kipsigis", "read_hours": 122, "spontaneous_hours": 399, "total_hours": 521},
        {"language": "Maasai", "iso_code": "mas", "dialects": "Kimasaai, Kisamburu", "read_hours": 51, "spontaneous_hours": 454, "total_hours": 505},
    ],
    "repositories": [
        "DigitalUmuganda/Afrivoice_Swahili",
        "MCAA1-MSU/anv_data_ke",
        "DigitalUmuganda/Afrivoice",
        "digitalumuganda/anv-test-data-nt",
    ],
}


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _latest_submission() -> Path | None:
    submission_dir = PROJECT_ROOT / "outputs" / "local_data" / "submissions"
    if not submission_dir.exists():
        return None
    candidates = sorted(submission_dir.glob("*.csv"), key=lambda path: path.stat().st_mtime, reverse=True)
    return candidates[0] if candidates else None


def _read_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"_invalid_json": True}


def _relative(path: Path | None) -> str | None:
    if not path:
        return None
    try:
        return str(path.relative_to(PROJECT_ROOT))
    except ValueError:
        return str(path)


def _number(value: Any) -> float:
    try:
        return float(value or 0)
    except (TypeError, ValueError):
        return 0.0


def _check(check_id: str, label: str, passed: bool, detail: str, action: str, required: bool = True) -> dict[str, Any]:
    return {
        "id": check_id,
        "label": label,
        "status": "pass" if passed else "missing" if required else "warning",
        "required": required,
        "detail": detail,
        "action": action,
    }


def _validate_submission_csv(path: Path | None) -> dict[str, Any]:
    if not path:
        return {
            "exists": False,
            "path": None,
            "row_count": 0,
            "valid": False,
            "violations": ["No generated submission.csv was found."],
        }
    violations: list[str] = []
    row_count = 0
    try:
        with path.open("r", newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            if reader.fieldnames != SUBMISSION_COLUMNS:
                violations.append(f"Header must be exactly {SUBMISSION_COLUMNS}; found {reader.fieldnames}.")
            for row_number, row in enumerate(reader, start=2):
                row_count += 1
                language = row.get("language", "")
                if language not in ALLOWED_LANGUAGE_CODES:
                    violations.append(f"Row {row_number}: invalid language code '{language}'.")
                if not str(row.get("id", "")).strip():
                    violations.append(f"Row {row_number}: id is required.")
                if row.get("prediction") is None:
                    violations.append(f"Row {row_number}: prediction column is required.")
    except OSError as exc:
        violations.append(f"Could not read CSV: {exc}")
    return {
        "exists": True,
        "path": _relative(path),
        "row_count": row_count,
        "valid": not violations,
        "violations": violations,
    }


def collect_competition_validation() -> dict[str, Any]:
    submission = _validate_submission_csv(_latest_submission())
    model_metadata_path = PROJECT_ROOT / "models" / "checkpoints" / "model-metadata.json"
    model_metadata = _read_json(model_metadata_path)
    hardware_path = PROJECT_ROOT / "reports" / "hardware_latency_report.json"
    hardware = _read_json(hardware_path)
    full_inference_path = PROJECT_ROOT / "outputs" / "local_data" / "inference" / "full_test_predictions.jsonl"
    model_card_path = PROJECT_ROOT / "models" / "model_card.md"
    training_logs_path = PROJECT_ROOT / "outputs" / "local_data" / "training" / "training_logs.jsonl"
    no_manual_policy_path = PROJECT_ROOT / "docs" / "NO_MANUAL_TEST_CORRECTION_ATTESTATION.md"
    team_policy_path = PROJECT_ROOT / "docs" / "TEAM_AND_LEADERBOARD_ATTESTATION.md"
    release_checklist_path = PROJECT_ROOT / "docs" / "OPEN_SOURCE_RELEASE_CHECKLIST.md"
    third_party_license_path = PROJECT_ROOT / "docs" / "THIRD_PARTY_LICENSES.md"
    dataset_card_path = PROJECT_ROOT / "docs" / "DATASET_DESCRIPTION.md"
    terms_ack_path = PROJECT_ROOT / "docs" / "COMPETITION_TERMS_ACKNOWLEDGEMENT.md"
    license_path = PROJECT_ROOT / "LICENSE"

    parameter_count = int(_number(model_metadata.get("parameter_count")))
    public_weights_url = str(model_metadata.get("public_weights_url") or "").strip()
    model_license = str(model_metadata.get("license") or "").strip().lower()
    edge_memory_gb = _number(model_metadata.get("edge_memory_gb"))
    hardware_ram_gb = _number(hardware.get("ram_gb"))
    hardware_latency_ms = _number(hardware.get("mean_latency_ms"))

    checks = [
        _check(
            "submission_csv_format",
            "Kaggle CSV format",
            bool(submission["valid"]),
            f"Latest CSV: {submission['path'] or 'missing'}; rows: {submission['row_count']}; violations: {len(submission['violations'])}.",
            "Generate a submission from Metadata > Kaggle submission builder. Header must be id,language,prediction.",
        ),
        _check(
            "full_test_inference",
            "Full Kaggle test inference",
            full_inference_path.exists() and full_inference_path.stat().st_size > 0,
            f"Expected predictions manifest: {_relative(full_inference_path)}.",
            "Run inference on the complete Kaggle test dataset and save one JSONL row per test audio file.",
        ),
        _check(
            "real_model_checkpoint",
            "Real trained or fine-tuned checkpoint",
            model_metadata_path.exists() and bool(model_metadata.get("checkpoint_path")),
            f"Expected metadata: {_relative(model_metadata_path)}.",
            "Add checkpoint metadata that points to the trained model artifact used for inference.",
        ),
        _check(
            "public_weights",
            "Public model weights/checkpoints",
            public_weights_url.startswith("https://"),
            public_weights_url or "No public weights URL found.",
            "Publish model weights/checkpoints to GitHub Releases or Hugging Face and add public_weights_url.",
        ),
        _check(
            "model_size_limit",
            "Under 1B parameters",
            0 < parameter_count < 1_000_000_000,
            f"parameter_count={parameter_count or 'missing'}",
            "Record parameter_count in models/checkpoints/model-metadata.json.",
        ),
        _check(
            "edge_memory_limit",
            "Edge memory <= 8 GB",
            0 < edge_memory_gb <= 8,
            f"edge_memory_gb={edge_memory_gb or 'missing'}",
            "Benchmark or estimate peak model memory and keep it at or below 8 GB.",
        ),
        _check(
            "hardware_latency_report",
            "Hardware latency report",
            hardware_path.exists() and hardware_ram_gb <= 8 and hardware_latency_ms > 0,
            f"Expected report: {_relative(hardware_path)}; ram_gb={hardware_ram_gb or 'missing'}; mean_latency_ms={hardware_latency_ms or 'missing'}.",
            "Run the latency script on an edge device or edge-like machine and save reports/hardware_latency_report.json.",
        ),
        _check(
            "no_manual_test_correction",
            "No manual correction of test audio",
            no_manual_policy_path.exists(),
            f"Attestation file: {_relative(no_manual_policy_path)}.",
            "Keep the test-set prediction path fully automated and do not manually transcribe or correct test audio.",
        ),
        _check(
            "team_and_leaderboard_policy",
            "Team and leaderboard policy",
            team_policy_path.exists(),
            f"Attestation file: {_relative(team_policy_path)}.",
            "Keep team size at 5 or fewer participants and use one leaderboard account per team.",
        ),
        _check(
            "open_source_release_checklist",
            "Open-source release checklist",
            release_checklist_path.exists(),
            f"Checklist file: {_relative(release_checklist_path)}.",
            "Publish code, training scripts, checkpoints, weights, model cards, and data cards under an OSI-approved permissive license.",
        ),
        _check(
            "third_party_license_review",
            "Third-party license review",
            third_party_license_path.exists(),
            f"License review file: {_relative(third_party_license_path)}.",
            "Document pretrained models, dependencies, external tools, external data, and any incompatible licenses.",
        ),
        _check(
            "permissive_license",
            "Permissive open-source license",
            license_path.exists() and (model_license in PERMISSIVE_LICENSES or license_path.read_text(encoding="utf-8", errors="ignore").lower().startswith("mit")),
            f"Repository license found: {license_path.exists()}; model license: {model_metadata.get('license') or 'missing'}.",
            "Use MIT, Apache-2.0, BSD-3-Clause, or MPL-2.0 and record the model license.",
        ),
        _check(
            "model_card",
            "Model card included",
            model_card_path.exists(),
            f"Expected model card: {_relative(model_card_path)}.",
            "Create a model card covering languages, datasets, WER, limitations, intended use, and ethics.",
        ),
        _check(
            "dataset_card",
            "Dataset card included",
            dataset_card_path.exists(),
            f"Dataset card file: {_relative(dataset_card_path)}.",
            "Include the organizer-provided dataset card and source repository references with the final submission.",
        ),
        _check(
            "competition_terms_acknowledgement",
            "Competition terms acknowledgement",
            terms_ack_path.exists(),
            f"Terms acknowledgement: {_relative(terms_ack_path)}.",
            "Document acceptance of competition-specific rules and Kaggle foundational rules.",
        ),
        _check(
            "training_logs",
            "Training logs and reproducibility artifacts",
            training_logs_path.exists(),
            f"Expected logs: {_relative(training_logs_path)}.",
            "Save training logs, hardware specs, checkpoints, and reproducibility notes.",
        ),
    ]
    failed_required = [item for item in checks if item["required"] and item["status"] != "pass"]
    return {
        "generated_at": _utc_now(),
        "status": "ready" if not failed_required else "blocked",
        "passed": len([item for item in checks if item["status"] == "pass"]),
        "failed": len(failed_required),
        "submission_requirements": {
            "required_columns": SUBMISSION_COLUMNS,
            "valid_language_codes": ALLOWED_LANGUAGE_CODES,
            "language_column_rule": "Use 3-letter ISO 639-3 codes only, never full language names.",
            "no_manual_test_audio_correction": True,
        },
        "competition_rules": COMPETITION_RULES,
        "dataset_summary": AFRIVOICES_DATASET_SUMMARY,
        "submission": submission,
        "checks": checks,
    }


def write_competition_validation_reports() -> dict[str, Any]:
    report = collect_competition_validation()
    reports_dir = PROJECT_ROOT / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)
    json_path = reports_dir / "competition_validation_report.json"
    md_path = reports_dir / "competition_validation_report.md"
    json_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    lines = [
        "# Competition Validation Report",
        "",
        f"Generated: {report['generated_at']}",
        f"Status: {report['status']}",
        f"Passed: {report['passed']}",
        f"Failed: {report['failed']}",
        "",
        "## Required Submission Format",
        "",
        "CSV header must be exactly: `id,language,prediction`.",
        "Language values must be ISO 639-3 codes: `swa`, `kik`, `luo`, `som`, `mas`, `kln`.",
        "",
        "## Competition Rules Summary",
        "",
        "- Team size must be 5 or fewer participants.",
        "- Use one leaderboard account per team.",
        "- Do not manually transcribe or correct test audio.",
        "- Publish code, training scripts, checkpoints, weights, model cards, and data cards under a permissive open-source license.",
        "- External pretrained models/tools/data must be public, reasonably available, and license-compatible.",
        "- Model must be under 1B parameters and capable of edge inference with 8 GB RAM or less.",
        "- Include hardware latency for the full test set.",
        "- Competition rules are governed by Rwanda law unless otherwise specified.",
        "",
        "## Checks",
        "",
    ]
    for item in report["checks"]:
        lines.append(f"- **{item['label']}**: {item['status']} - {item['detail']}")
        lines.append(f"  Action: {item['action']}")
    md_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return {**report, "report_paths": {"json": _relative(json_path), "markdown": _relative(md_path)}}
