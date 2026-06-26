# Architecture

## Application Layers

- `backend/app/main.py`: FastAPI application entry point.
- `backend/app/api/v1/`: API routes for auth, transcriptions, integrations, submissions, jobs, settings, and dashboards.
- `backend/app/core/`: reusable infrastructure logic such as ASR adapters, audio checks, auth security, storage, jobs, WER, and translation.
- `backend/app/services/`: business workflows for transcription, feedback, analytics, and audit logging.
- `backend/app/db/`: SQLAlchemy models, database session, and seed data.
- `frontend/`: browser dashboard served by FastAPI.
- `backend/app/workers/`: background worker entry points.
- `backend/ml/`: data preparation, evaluation, and Kaggle submission helpers.
- `backend/edge/`: local edge/CLI entry points for offline deployment.
- `infra/`: local infrastructure manifests.
- `scripts/`: repeatable local developer commands.

## Runtime Flow

1. User records or uploads audio in the dashboard.
2. Browser submits audio to `POST /api/v1/transcriptions`.
3. The backend stores audio through `backend/app/core/storage.py`.
4. `backend/app/core/model_adapters.py` chooses the active ASR runtime.
5. Transcription metadata, segments, confidence, and review state are stored in SQLite locally.
6. Users can replay audio, edit transcripts, assign review, export results, or build a Kaggle submission.

## ASR Adapter Strategy

The app defaults to `mock` so local development works immediately. The adapter switcher is wired for:

- `mock`
- `whisper`
- `faster_whisper`
- `wav2vec2`
- `hf_finetuned`

Install the related Python packages and configure `.env` to use real model weights.
