# Operations

## Local Data

Generated local data is kept under:

- `outputs/local_data/afrivoice.db`
- `outputs/local_data/uploads/`
- `outputs/local_data/submissions/`

These paths are intentionally ignored by `.gitignore` because they contain local runtime state.

## Dataset Inputs

Use these manifests and source folders:

- `data/manifests/`: clean JSONL manifests for Kaggle/Hugging Face datasets.
- `data/raw/`: local raw datasets when downloaded.
- `backend/ml/data/prepare_kaggle_test.py`: helper for preparing Kaggle test manifests.

## Model Artifacts

Use:

- `models/checkpoints/`: training checkpoints.
- `models/exports/`: ONNX, CTranslate2, or TFLite export packages.

## Production Checklist

- Set `AUTH_SECRET` in `.env`.
- Use Postgres instead of local SQLite.
- Use S3, GCS, or Supabase Storage instead of local upload storage.
- Use Celery/Redis for long transcription, sync, export, and evaluation jobs.
- Install the selected ASR runtime dependencies.
- Keep audit logs enabled for upload, edit, delete, export, review, and evaluation actions.
