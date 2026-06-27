# Kaggle EAC ASR Platform

**Live Demo:** https://kaggle-eac-asr-platform.onrender.com  
**API Docs:** https://kaggle-eac-asr-platform.onrender.com/docs  
**Health Check:** https://kaggle-eac-asr-platform.onrender.com/api/v1/health  

Kaggle EAC ASR Platform is a full-stack Automatic Speech Recognition system built for the AfriVoice East Africa ASR Hackathon. The platform helps users record, upload, transcribe, review, correct, replay, export, and manage speech data for six East African languages.

The project is designed as a practical ASR engineering platform, not only a transcription demo. It includes a FastAPI backend, a modern browser dashboard, audio recording and upload workflows, transcript history, reviewer tools, model comparison, WER/CER evaluation, dataset audit tools, Kaggle submission support, and edge/offline deployment planning.

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
- Allows users to replay saved audio
- Allows users to delete saved audio records
- Provides transcript editing and correction tools
- Supports review states such as Needs Review, Approved, Rejected, and Corrected
- Exports transcripts as TXT, JSON, and CSV
- Provides search and filtering across records
- Tracks model quality with WER, CER, latency, confidence, and language coverage
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
- Transcript editor
- Transcript correction workflow
- Batch transcription interface
- Per-language WER leaderboard
- Dataset audit dashboard
- Audio quality checker
- WER/CER calculator
- Model comparison dashboard
- Model quality dashboard
- Kaggle submission builder
- Dataset sync status dashboard
- Record details drawer
- Export buttons for TXT, JSON, and CSV
- Light/dark theme toggle
- Deployment readiness checklist
- Local TTS WAV preview endpoint
- API documentation through FastAPI Swagger UI

## How To Demo

1. Open the live demo:
   https://kaggle-eac-asr-platform.onrender.com

2. Use the dashboard to explore the main ASR workspace.

3. Record speech with the browser recorder or upload an audio file.

4. Run transcription and review the generated transcript.

5. Open the speech library to view saved records.

6. Replay saved audio directly from the record list.

7. Edit or correct the transcript.

8. Export the transcript as TXT, JSON, or CSV.

9. Check model quality, leaderboard, audit, and evaluation pages.

10. Open the API documentation:
    https://kaggle-eac-asr-platform.onrender.com/docs

## Tech Stack

- Backend: FastAPI
- Frontend: HTML, CSS, JavaScript
- Database: SQLite for local development
- Deployment: Docker on Render
- Authentication: Token-based local authentication
- Evaluation: WER/CER scoring tools
- ML/ASR Ready: Whisper, faster-whisper, Wav2Vec2, Hugging Face, fine-tuned AfriVoice adapters

## Local Development URLs

```text
Website: http://localhost:8000
API Docs: http://localhost:8000/docs
Health Check: http://localhost:8000/api/v1/health
API Base: http://localhost:8000/api/v1
