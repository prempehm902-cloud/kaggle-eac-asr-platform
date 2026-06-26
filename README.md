# Kaggle EAC ASR

Kaggle EAC ASR is a full-stack Automatic Speech Recognition platform for the AfriVoice East Africa ASR Hackathon. It is designed to help users record, upload, transcribe, review, correct, replay, export, and manage speech data for six East African languages: Swahili, Kikuyu, Luo/Dholuo, Somali, Maasai, and Kalenjin.

The project focuses on real-world ASR workflows, not just a single transcription demo. It includes a FastAPI backend, a modern browser dashboard, audio recording and upload flows, transcript history, reviewer tools, dataset sync scaffolding, model comparison, WER/CER evaluation, Kaggle submission generation, and edge/offline deployment planning. The goal is to support low-resource language speech recognition in a way that is useful for research, data cleanup, model training, and practical field deployment.

## What This Project Does

- Accepts recorded or uploaded audio from users
- Runs audio quality checks and ASR transcription workflows
- Supports multilingual ASR workflows for East African languages
- Stores speech records, transcripts, metadata, confidence, and timestamps
- Lets users replay saved audio and manage previous speech records
- Provides transcript editing, correction, review, and export tools
- Tracks model quality through WER, CER, latency, confidence, and language coverage
- Includes infrastructure for Kaggle test submission building and dataset synchronization
- Prepares the project for future real model integration with Whisper, faster-whisper, Wav2Vec2, Hugging Face, or a fine-tuned AfriVoice model

## Why It Matters

Many East African languages are underrepresented in speech technology. This platform provides a practical foundation for building, evaluating, and improving ASR systems that can work offline, support edge deployment, and help collect cleaner training data from real users.

## Local URLs

- Website: http://localhost:8000
- API docs: http://localhost:8000/docs
- Health: http://localhost:8000/api/v1/health
- API base: http://localhost:8000/api/v1

If port `8000` is already busy on your machine, run the app on port `8001` and open `http://127.0.0.1:8001`.

## Demo Features

- Dataset-style AfriVoice console at `/`
- Single-file transcription with language ID, confidence, translation, and diarization flags
- Transcript editor and feedback loop
- Batch transcription endpoint and UI
- Model comparison page for baseline, fine-tuned, and edge models
- Per-language WER leaderboard
- Dataset audit dashboard
- Audio quality checker
- WER/CER calculator
- Offline mode indicator
- Custom vocabulary / phrase boosting scaffold
- Kaggle submission builder scaffold
- Dataset action bar with vote, code, and download controls
- Activity summary strip with views, downloads, engagement, comments, and contributors
- Detail View analytics with views/downloads charts and time filters
- Modern white sidebar navigation with AfriVoice branding and feature shortcuts
- Professional inline SVG icons for navigation and search, replacing placeholder text symbols
- Browser microphone recorder that submits captured audio to the ASR endpoint
- Transcript history page with view, edit, and download actions
- Recorder timer, waveform animation, and clear Ready/Recording/Processing/Completed states
- Transcript export buttons for TXT, JSON, and CSV
- Home workflow cards for record, review, correct, and export/submit
- Language readiness badges for Swahili, Kikuyu, Luo, Somali, Maasai, and Kalenjin
- Model quality dashboard with WER, latency, memory, size, and edge readiness signals
- Polished empty states and first-use onboarding checklist
- Light/dark theme toggle
- Real ASR adapter switcher for mock, Whisper, faster-whisper, Wav2Vec2, and fine-tuned Hugging Face models
- Kaggle/Hugging Face dataset sync status dashboard with real manifest generation when credentials and dependencies are available
- Record details drawer with replay, transcript, confidence, review, metadata, export, and delete actions
- Reviewer workflow states: Needs Review, Approved, Rejected, Corrected
- Training job dashboard with WER/loss/artifact signals
- Kaggle submission builder that scans local synced audio/manifests and generates a local `submission.csv` artifact
- Deployment readiness checklist for API, storage, auth, queues, model artifacts, and dataset sync
- Optional S3, GCS, and Supabase-ready audio storage wiring with local replay cache
- Queue-aware background job wiring for local and Celery-backed workers
- Local TTS WAV preview generation endpoint

## Run Locally

```bash
./scripts/bootstrap_local.sh
make run
```

## PyCharm

Open this folder directly in PyCharm:

`/Users/michaelprempeh/Documents/Codex/Kaggle/Kaggle`

Use `.venv/bin/python` as the interpreter. Set the project root as the working directory and add `backend` to `PYTHONPATH`, then run the `uvicorn app.main:app --reload --host 127.0.0.1 --port 8000` module configuration.

## Project Structure

- `backend/app/`: FastAPI backend, services, model adapters, database models
- `backend/alembic/`: database migrations
- `backend/tests/`: backend API and workflow tests
- `frontend/`: browser dashboard served by FastAPI
- `docs/`: local setup, architecture, operations, API map
- `infrastructure/`: Docker/Redis local infrastructure
- `scripts/`: install, run, test, smoke-check, cleanup
- `backend/ml/`: dataset preparation, evaluation, submission helpers
- `backend/edge/`: edge/offline CLI entry points
- `data/manifests/`: clean dataset manifests
- `models/exports/`: generated model export packages
- `reports/`: evaluation and deployment reports
- `outputs/local_data/`: local runtime data, uploads, database, submissions

The app defaults to the safe `mock` adapter so local development works immediately. Select Whisper, faster-whisper, Wav2Vec2, or a fine-tuned Hugging Face model once the related dependencies and model weights are available. Kaggle/Hugging Face dataset sync, cloud storage, Celery workers, and neural TTS are wired through configuration and become active when the required credentials, services, and model artifacts are provided.
