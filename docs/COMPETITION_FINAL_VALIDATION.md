# Competition Final Validation

Use the validation panel in the dashboard or these API endpoints:

- `GET /api/v1/competition/validation/status`
- `POST /api/v1/competition/validation/run`

The validator checks the supervisor and Kaggle requirements:

- `submission.csv` header is exactly `id,language,prediction`
- language values use ISO 639-3 codes only: `swa`, `kik`, `luo`, `som`, `mas`, `kln`
- full Kaggle test-set inference output exists at `outputs/local_data/inference/full_test_predictions.jsonl`
- real checkpoint metadata exists at `models/checkpoints/model-metadata.json`
- public model weights URL is recorded
- model has fewer than 1 billion parameters
- edge memory is at or below 8 GB
- real hardware latency report exists at `reports/hardware_latency_report.json`
- no manual correction of test audio is documented
- permissive open-source license is present
- model card and training logs are included

The validator intentionally fails with `blocked` when real artifacts are missing. This prevents accidental submission of demo outputs as final competition artifacts.
