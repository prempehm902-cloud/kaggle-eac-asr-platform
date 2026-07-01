# Competition Compliance Checklist

This project is wired to match the AfriVoice East Africa ASR Hackathon submission rules.

## Submission CSV

The generated Kaggle file must be CSV with exactly this header:

```csv
id,language,prediction
```

No extra columns are allowed in the final upload.

## Language Codes

Use ISO 639-3 codes in the `language` column:

| Language | ISO 639-3 code |
| --- | --- |
| Swahili | `swa` |
| Kikuyu | `kik` |
| Luo / Dholuo | `luo` |
| Somali | `som` |
| Maasai | `mas` |
| Kalenjin | `kln` |

Full language names such as `Swahili` or `Maasai` must not be submitted in the Kaggle CSV.

## Test Data Policy

- Do not manually transcribe or human-correct test audio.
- Test predictions must come from the ASR model pipeline.
- If the Kaggle test dataset is not synced locally, the generated CSV is marked `preview_only`.
- Human review tools in this project are for training/validation data cleanup, not for editing Kaggle test predictions.

## Team And Release Rules

- Team size must be 5 participants or fewer.
- Use one leaderboard account per team.
- Share your Kaggle username with the organizer so you can be added to the team.
- Publish submitted code, training scripts, model checkpoints/weights, logs, hardware specs, and model/data cards in a public repository or Hugging Face space.
- Use a permissive license such as MIT, Apache-2.0, BSD-3-Clause, or MPL-2.0.

## Model And Edge Constraints

- The model must be under 1 billion parameters total.
- The model must run on edge devices with 8 GB RAM or less.
- Include hardware validation with inference latency for the full test set.
- Organizers may run the submitted model and request reproducibility artifacts.

## Project Wiring

- `POST /api/v1/submissions/kaggle` writes `id,language,prediction` CSV files.
- `GET /api/v1/submissions/requirements` returns the validation contract and rules.
- `backend/app/core/competition.py` centralizes language-code mapping and validation.
- `backend/ml/evaluation/kaggle_submission.py` writes the same strict CSV format from manifests.
