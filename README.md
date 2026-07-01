# Kaggle EAC ASR Platform

**Live Demo:** https://kaggle-eac-asr-platform.onrender.com  
**API Docs:** https://kaggle-eac-asr-platform.onrender.com/docs  
**Health Check:** https://kaggle-eac-asr-platform.onrender.com/api/v1/health  

Kaggle EAC ASR Platform is a full-stack Automatic Speech Recognition system built for the AfriVoice East Africa ASR Hackathon. The platform helps users record, upload, transcribe, review, correct, replay, export, evaluate, and manage speech data for six East African languages.

The project is designed as a practical ASR engineering platform, not only a transcription demo. It includes a FastAPI backend, a modern browser dashboard, audio recording and upload workflows, transcript history, reviewer tools, model comparison, WER/CER/accuracy evaluation, dataset audit tools, Kaggle submission support, and edge/offline deployment planning.

## Supported Languages

- Swahili
- Kikuyu
- Luo / Dholuo
- Somali
- Maasai
- Kalenjin

## What This Project Does

- Records speech directly from the browser microphone
- Uploads audio files for transcription
- Converts speech audio into text through an ASR workflow
- Stores speech records, transcripts, timestamps, confidence scores, and metadata
- Allows users to replay and delete saved audio records
- Provides transcript editing, correction, review, and export tools
- Supports review states such as Needs Review, Approved, Rejected, and Corrected
- Exports transcripts as TXT, JSON, and CSV
- Provides search and filtering across records
- Tracks model quality with WER, CER, accuracy, latency, confidence, and language coverage
- Generates multi-sample accuracy reports from reference and predicted transcripts
- Includes dataset audit and Kaggle submission builder workflows
- Provides infrastructure for future Whisper, faster-whisper, Wav2Vec2, Hugging Face, and fine-tuned AfriVoice model integration

## Why This Project Matters

Many East African languages are underrepresented in modern speech technology. This platform provides a practical foundation for building, testing, improving, and deploying ASR systems for low-resource languages.

The goal is to support real-world use cases such as field recordings, offline transcription, dataset cleanup, model evaluation, community review, and edge deployment.

## Demo Features

- Modern ASR dashboard
- Browser microphone recorder
- Audio upload workflow
- Speech library and transcript history
- Saved audio replay and delete actions
- Transcript editor and correction workflow
- Batch transcription interface
- Per-language WER leaderboard
- Dataset audit dashboard
- Audio quality checker
- WER/CER calculator
- Accuracy evaluation panel with overall and per-language scoring
- Model comparison and model quality dashboards
- Kaggle submission builder
- Dataset sync status dashboard
- Record details drawer
- Export buttons for TXT, JSON, and CSV
- Light/dark theme toggle
- Deployment readiness checklist
- Local TTS WAV preview endpoint
- API documentation through FastAPI Swagger UI

## How To Demo

1. Open the live demo: https://kaggle-eac-asr-platform.onrender.com
2. Use the dashboard to explore the main ASR workspace.
3. Record speech with the browser recorder or upload an audio file.
4. Run transcription and review the generated transcript.
5. Open the speech library to view saved records.
6. Replay saved audio directly from the record list.
7. Edit or correct the transcript.
8. Export the transcript as TXT, JSON, or CSV.
9. Open Tools to calculate WER/CER or generate an accuracy report.
10. Check model quality, leaderboard, audit, and evaluation pages.
11. Open the API documentation: https://kaggle-eac-asr-platform.onrender.com/docs


## Kaggle Competition Requirements

The project now validates the boss/organizer submission rules directly in the backend and UI.

Final Kaggle submission files must be CSV files with exactly these three columns:

```csv
id,language,prediction
```

The `language` column must use ISO 639-3 codes only:

| Language | Code |
| --- | --- |
| Swahili | `swa` |
| Kikuyu | `kik` |
| Luo / Dholuo | `luo` |
| Somali | `som` |
| Maasai | `mas` |
| Kalenjin | `kln` |

Important rules captured in this project:

- Do not manually transcribe or human-correct Kaggle test audio.
- A generated file is final-upload ready only after the Kaggle test dataset has been synced locally and predictions come from the ASR pipeline.
- Team size must be 5 participants or fewer.
- Use one leaderboard account per team.
- Share your Kaggle username with the organizer to be added to the team.
- Publish code, training scripts, checkpoints/weights, logs, hardware specs, and model/data cards publicly.
- Use a permissive open-source license such as MIT, Apache-2.0, BSD-3-Clause, or MPL-2.0. This repository includes an MIT license.
- Keep the model under 1 billion parameters.
- Validate inference on edge hardware with 8 GB RAM or less and include latency for the full test set.
- Cite external pretrained models and verify license compatibility.

The strict submission route is:

```text
POST /api/v1/submissions/kaggle
```

The requirements endpoint is:

```text
GET /api/v1/submissions/requirements
```

See `docs/COMPETITION_COMPLIANCE.md` for the complete checklist.

## Tech Stack

- Backend: FastAPI
- Frontend: HTML, CSS, JavaScript
- Database: SQLite for local development
- Deployment: Docker on Render
- Authentication: Token-based local authentication
- Evaluation: WER, CER, accuracy, and per-language scoring tools
- ML/ASR Ready: Whisper, faster-whisper, Wav2Vec2, Hugging Face, fine-tuned AfriVoice adapters

## Local Development URLs

```text
Website: http://localhost:8000
API Docs: http://localhost:8000/docs
Health Check: http://localhost:8000/api/v1/health
API Base: http://localhost:8000/api/v1
```

If port `8000` is already in use, run the app on another port such as `http://127.0.0.1:8001`.

## Running Locally

```bash
git clone https://github.com/prempehm902-cloud/kaggle-eac-asr-platform.git
cd kaggle-eac-asr-platform
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
PYTHONPATH=backend python3 -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Then open `http://localhost:8000`.

## Render Deployment

The project is deployed on Render using Docker.

Live URL:

```text
https://kaggle-eac-asr-platform.onrender.com
```

Render uses the lightweight deployment dependency file:

```text
requirements-render.txt
```

This keeps the hosted version stable and avoids installing very large ML packages during deployment.

## Important Deployment Note

The live Render demo currently uses a lightweight mock ASR adapter so the app can run reliably on a free Render instance.

The project is structured to support real ASR inference with:

- Whisper
- faster-whisper
- Wav2Vec2
- Hugging Face models
- Fine-tuned AfriVoice models

To enable real ASR inference in production, install the required ML dependencies, provide model weights, and configure the selected ASR adapter.

## Project Structure

```text
backend/app/          FastAPI backend, services, model adapters, and database models
backend/alembic/      Database migrations
backend/tests/        Backend API and workflow tests
frontend/             Browser dashboard served by FastAPI
docs/                 Architecture, API map, local setup, and operations notes
infrastructure/       Docker and local infrastructure files
scripts/              Bootstrap, run, test, smoke-check, and cleanup scripts
backend/ml/           Dataset preparation, evaluation, and submission helpers
backend/edge/         Edge/offline CLI entry points
data/manifests/       Clean dataset manifests
models/exports/       Generated model export packages
reports/              Evaluation and deployment reports
outputs/local_data/   Local runtime data, uploads, database, and submissions
```

## Current Status

Working:

- Full-stack dashboard
- FastAPI backend
- API documentation
- Audio upload flow
- Browser recording flow
- Speech library
- Transcript history
- Replay and delete saved audio
- Export transcript files
- Search and filtering
- WER/CER calculator
- Multi-sample accuracy evaluation
- Per-language accuracy summaries
- Model comparison UI
- Dataset audit UI
- Review workflow structure
- Render deployment
- Docker deployment setup

Planned or ready for extension:

- Real Whisper/faster-whisper/Hugging Face inference in production
- Cloud audio storage such as S3, GCS, or Supabase Storage
- Production background queue with Celery, RQ, or Arq
- Full training dashboard connected to live fine-tuning jobs
- Full Kaggle dataset prediction pipeline
- Production-grade multi-user workspace permissions

## Testing

```text
10 tests passing
```

## Hackathon Context

This project was built for the AfriVoice East Africa ASR Hackathon, where the goal is to develop a unified ASR system for multiple East African languages with a focus on accessibility, offline use, edge deployment, and real-world usability.

## License

This project is released under the MIT License. See `LICENSE`.
