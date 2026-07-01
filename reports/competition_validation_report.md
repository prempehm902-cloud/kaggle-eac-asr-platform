# Competition Validation Report

Generated: 2026-07-01T16:56:10.074508+00:00
Status: blocked
Passed: 3
Failed: 8

## Required Submission Format

CSV header must be exactly: `id,language,prediction`.
Language values must be ISO 639-3 codes: `swa`, `kik`, `luo`, `som`, `mas`, `kln`.

## Checks

- **Kaggle CSV format**: pass - Latest CSV: outputs/local_data/submissions/submission-4c0cee8e.csv; rows: 3; violations: 0.
  Action: Generate a submission from Metadata > Kaggle submission builder. Header must be id,language,prediction.
- **Full Kaggle test inference**: missing - Expected predictions manifest: outputs/local_data/inference/full_test_predictions.jsonl.
  Action: Run inference on the complete Kaggle test dataset and save one JSONL row per test audio file.
- **Real trained or fine-tuned checkpoint**: missing - Expected metadata: models/checkpoints/model-metadata.json.
  Action: Add checkpoint metadata that points to the trained model artifact used for inference.
- **Public model weights/checkpoints**: missing - No public weights URL found.
  Action: Publish model weights/checkpoints to GitHub Releases or Hugging Face and add public_weights_url.
- **Under 1B parameters**: missing - parameter_count=missing
  Action: Record parameter_count in models/checkpoints/model-metadata.json.
- **Edge memory <= 8 GB**: missing - edge_memory_gb=missing
  Action: Benchmark or estimate peak model memory and keep it at or below 8 GB.
- **Hardware latency report**: missing - Expected report: reports/hardware_latency_report.json; ram_gb=missing; mean_latency_ms=missing.
  Action: Run the latency script on an edge device or edge-like machine and save reports/hardware_latency_report.json.
- **No manual correction of test audio**: pass - Attestation file: docs/NO_MANUAL_TEST_CORRECTION_ATTESTATION.md.
  Action: Keep the test-set prediction path fully automated and do not manually transcribe or correct test audio.
- **Permissive open-source license**: pass - Repository license found: True; model license: missing.
  Action: Use MIT, Apache-2.0, BSD-3-Clause, or MPL-2.0 and record the model license.
- **Model/data card included**: missing - Expected model card: models/model_card.md.
  Action: Create a model card covering languages, datasets, WER, limitations, intended use, and ethics.
- **Training logs and reproducibility artifacts**: missing - Expected logs: outputs/local_data/training/training_logs.jsonl.
  Action: Save training logs, hardware specs, checkpoints, and reproducibility notes.
