# Competition Validation Report

Generated: 2026-07-02T07:52:17.911540+00:00
Status: blocked
Passed: 8
Failed: 8

## Required Submission Format

CSV header must be exactly: `id,language,prediction`.
Language values must be ISO 639-3 codes: `swa`, `kik`, `luo`, `som`, `mas`, `kln`.

## Competition Rules Summary

- Team size must be 5 or fewer participants.
- Use one leaderboard account per team.
- Do not manually transcribe or correct test audio.
- Publish code, training scripts, checkpoints, weights, model cards, and data cards under a permissive open-source license.
- External pretrained models/tools/data must be public, reasonably available, and license-compatible.
- Model must be under 1B parameters and capable of edge inference with 8 GB RAM or less.
- Include hardware latency for the full test set.
- Competition rules are governed by Rwanda law unless otherwise specified.

## Checks

- **Kaggle CSV format**: pass - Latest CSV: outputs/local_data/submissions/submission-38f26f7d.csv; rows: 3; violations: 0.
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
- **Team and leaderboard policy**: pass - Attestation file: docs/TEAM_AND_LEADERBOARD_ATTESTATION.md.
  Action: Keep team size at 5 or fewer participants and use one leaderboard account per team.
- **Open-source release checklist**: pass - Checklist file: docs/OPEN_SOURCE_RELEASE_CHECKLIST.md.
  Action: Publish code, training scripts, checkpoints, weights, model cards, and data cards under an OSI-approved permissive license.
- **Third-party license review**: pass - License review file: docs/THIRD_PARTY_LICENSES.md.
  Action: Document pretrained models, dependencies, external tools, external data, and any incompatible licenses.
- **Permissive open-source license**: pass - Repository license found: True; model license: missing.
  Action: Use MIT, Apache-2.0, BSD-3-Clause, or MPL-2.0 and record the model license.
- **Model card included**: missing - Expected model card: models/model_card.md.
  Action: Create a model card covering languages, datasets, WER, limitations, intended use, and ethics.
- **Dataset card included**: pass - Dataset card file: docs/DATASET_DESCRIPTION.md.
  Action: Include the organizer-provided dataset card and source repository references with the final submission.
- **Competition terms acknowledgement**: pass - Terms acknowledgement: docs/COMPETITION_TERMS_ACKNOWLEDGEMENT.md.
  Action: Document acceptance of competition-specific rules and Kaggle foundational rules.
- **Training logs and reproducibility artifacts**: missing - Expected logs: outputs/local_data/training/training_logs.jsonl.
  Action: Save training logs, hardware specs, checkpoints, and reproducibility notes.
