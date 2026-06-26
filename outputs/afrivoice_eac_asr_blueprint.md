# AfriVoice EAC ASR Hackathon Blueprint

## Goal

Build one unified multilingual ASR service for:

- Swahili: `swa`
- Kikuyu: `kik`
- Luo / Dholuo: `luo`
- Somali: `som`
- Maasai: `mas`
- Kalenjin: `kln`

The system accepts audio, normalizes and transcribes it, stores the request and output, and returns a response through an API. The training target is low WER, while the product target is offline/edge usability.

## Recommended Stack

- API: FastAPI
- ASR model: Whisper / faster-whisper baseline, then fine-tuned Whisper, MMS, or wav2vec2/XLS-R
- Inference runtime: PyTorch for development, CTranslate2/ONNX/TFLite for edge
- Storage: PostgreSQL for metadata and transcripts
- Object storage: local filesystem during hackathon, S3/MinIO later
- Jobs: Celery/RQ/Arq for async transcription
- Audio processing: ffmpeg, torchaudio, librosa
- Metrics: jiwer for WER/CER
- Experiment tracking: MLflow or Weights & Biases
- Language ID: lightweight classifier first, then integrated model-based detection
- Speaker diarization: pyannote.audio or NVIDIA NeMo
- Translation: NLLB, SeamlessM4T, or a small external translation service wrapper
- Monitoring: Prometheus metrics plus Grafana dashboard, or lightweight admin API
- Realtime API: WebSocket streaming for microphone and long-form audio

## Project Structure

```text
afrivoice-eac-asr/
  README.md
  pyproject.toml
  .env.example
  docker-compose.yml
  Makefile

  app/
    main.py
    config.py
    dependencies.py
    api/
      v1/
        router.py
        health.py
        transcriptions.py
        streaming.py
        languages.py
        models.py
        feedback.py
        translations.py
        analytics.py
        submissions.py
    core/
      audio.py
      normalization.py
      language_id.py
      inference.py
      confidence.py
      diarization.py
      translation.py
      domain_context.py
      streaming.py
      model_registry.py
      storage.py
      errors.py
    db/
      session.py
      models.py
      schemas.py
      migrations/
    workers/
      transcription_worker.py
    services/
      transcription_service.py
      evaluation_service.py
      feedback_service.py
      translation_service.py
      diarization_service.py
      monitoring_service.py
      submission_service.py

  edge/
    cli/
      afrivoice.py
    mobile/
      README.md
    offline_runtime/
      model_cache.py
      transcribe_local.py

  ml/
    configs/
      baseline_whisper_small.yaml
      finetune_whisper_small.yaml
      edge_quantized.yaml
      language_id.yaml
      domain_adaptive.yaml
    data/
      prepare_hf_afrivoice_swahili.py
      prepare_hf_anv_ke.py
      prepare_kaggle_test.py
      manifest_schema.py
      split_data.py
      build_feedback_dataset.py
    training/
      train_whisper.py
      train_xlsr.py
      train_language_id.py
      collators.py
      augmentations.py
    evaluation/
      compute_wer.py
      per_language_report.py
      confidence_calibration.py
      kaggle_submission.py
      error_analysis.py
    export/
      export_ctranslate2.py
      export_onnx.py
      quantize.py
      package_edge_model.py
    notebooks/
      01_data_audit.ipynb
      02_baseline_inference.ipynb

  data/
    raw/
      hf/
      kaggle/
    interim/
    manifests/
      train.jsonl
      validation.jsonl
      test.jsonl
    processed/

  models/
    baseline/
    finetuned/
    edge/

  tests/
    unit/
      test_audio.py
      test_normalization.py
      test_language_id.py
      test_confidence.py
      test_translation.py
    integration/
      test_transcription_api.py
      test_streaming_api.py
      test_worker.py
      test_feedback_loop.py

  scripts/
    download_hf_data.sh
    download_kaggle_data.py
    run_dev.sh
    benchmark_model.py
    start_worker.sh
    export_feedback_dataset.py
```

## Product Integrations

These additions make the project stronger as a real-world ASR product, not only a Kaggle model.

### Language ID Before ASR

Detect the language before transcription when the user does not provide `language`.

- First version: use Whisper language probabilities or a small audio/text classifier.
- Better version: train a six-language classifier on short audio windows.
- Store detected language, confidence, and alternatives.
- Use detected language to choose decoding prompts and normalization rules.

### Human Correction Loop

Every transcript should be correctable.

- Users submit corrected text through `/feedback`.
- Corrections are stored with the original transcript and WER delta.
- A scheduled export builds `data/manifests/feedback_finetune.jsonl`.
- High-confidence corrections become future fine-tuning data.

### Offline Mobile and Edge Package

Ship a local runtime for clinics, farms, schools, local offices, and field researchers.

- Quantized CTranslate2 or ONNX model.
- Local model cache.
- Local audio-to-text CLI.
- Optional SQLite storage for offline transcript history.
- Sync later when connectivity returns.

Example CLI:

```bash
afrivoice transcribe audio.wav --language swa --offline
afrivoice transcribe folder/ --detect-language --output transcripts.jsonl
```

### Confidence Scoring

Return confidence at transcript, segment, and token level.

- Flag low-confidence segments for review.
- Use confidence to prioritize human correction.
- Calibrate confidence against validation WER.

### Streaming Transcription

Support realtime or near-realtime transcription over WebSocket.

- Client streams microphone chunks.
- Server performs chunked ASR.
- Server returns partial and final segments.
- Store final transcript only, unless debug mode is enabled.

### Speaker Diarization

Add speaker labels for interviews, radio, meetings, and public-service workflows.

- Run diarization before or after ASR depending on model/runtime.
- Store speaker turns in `transcription_segments`.
- Support `SPEAKER_1`, `SPEAKER_2`, etc.

### Translation Layer

Optional translation from local languages to English or Swahili.

- Keep original transcript as source of truth.
- Store translations separately with target language and model version.
- Useful for public services, triage, education, and cross-language review.

### Domain-Aware ASR

Use domain metadata to improve decoding and analysis.

- Domains: health, agriculture, finance, government, education, customer care, everyday scenarios.
- Accept optional `domain` in API requests.
- Use domain hints for prompts, custom vocabulary, and error reports.

### Kaggle Submission Pipeline

Make submissions repeatable.

- Load Kaggle test files.
- Run the active model.
- Normalize predictions.
- Write `submission.csv`.
- Save model version and config used for each submission.

### Monitoring Dashboard

Track both model quality and API reliability.

- WER/CER by language when references are available.
- Latency by runtime and model.
- Upload failures and corrupt audio.
- Language distribution.
- Correction rate.
- Low-confidence segment rate.

### Demo Console Additions

The local web console now includes:

- Model comparison page for baseline Whisper, fine-tuned AfriVoice, and quantized edge models.
- Per-language leaderboard for Swahili, Kikuyu, Luo, Somali, Maasai, and Kalenjin WER.
- Audio quality checker for format, empty files, tiny/silent uploads, and future clipping/noise checks.
- Transcript editor that sends corrected text to the feedback loop.
- Batch transcription for multiple uploaded audio files.
- Kaggle submission builder UI backed by the submission endpoint.
- Dataset audit dashboard for hours, speakers, domains, scripted/unscripted splits, missing transcripts, and corrupt files.
- WER/CER calculator for fast local evaluation.
- Offline mode indicator for server, local edge, and offline CLI modes.
- Custom vocabulary / phrase boosting scaffold by domain.
- Dataset action controls for vote, code, download, and more actions.
- Activity summary strip for views, downloads, engagement, comments, and contributors.
- Detail View analytics with views/downloads charts and last-month filters.
- Modern white dashboard navigation with feature shortcuts for recorder, datasets, models, benchmarks, API/code, analytics, and tools.
- Browser microphone recorder connected to the transcription backend.
- Backend operations page for service health, pipeline status, capacity, workers, and storage mode.

## Data Strategy

Create one normalized manifest format for all sources.

```json
{
  "audio_path": "data/raw/hf/anv/kik/Scripted/example.wav",
  "text": "normalized transcript",
  "language": "kik",
  "dialect": "Gikabete",
  "speaker_id": "speaker-or-recorder-id",
  "duration_sec": 6.42,
  "domain": "Healthcare",
  "split": "train",
  "source": "MCAA1-MSU/anv_data_ke",
  "script_type": "scripted"
}
```

Pipeline:

1. Download datasets from Hugging Face and Kaggle.
2. Convert every audio file to 16 kHz mono WAV or FLAC.
3. Normalize transcripts consistently per language.
4. Preserve language, speaker, dialect, domain, scripted/unscripted metadata.
5. Use speaker-disjoint train/validation/test splits.
6. Train one multilingual model with language tags or forced decoder prompts.
7. Evaluate WER overall and per language.

## Backend Endpoints

Base path: `/api/v1`

### Health

`GET /health`

Response:

```json
{
  "status": "ok",
  "model_loaded": true,
  "active_model": "whisper-small-afrivoice-v1"
}
```

### List Supported Languages

`GET /languages`

Response:

```json
[
  {"code": "swa", "name": "Swahili"},
  {"code": "kik", "name": "Kikuyu"},
  {"code": "luo", "name": "Luo / Dholuo"},
  {"code": "som", "name": "Somali"},
  {"code": "mas", "name": "Maasai"},
  {"code": "kln", "name": "Kalenjin"}
]
```

### Synchronous Transcription

`POST /transcriptions`

Use this for short audio clips.

Form data:

- `file`: audio file
- `language`: optional language code
- `detect_language`: boolean, default `true`
- `return_segments`: boolean, default `true`
- `diarize`: boolean, default `false`
- `translate_to`: optional target language code, for example `eng` or `swa`
- `domain`: optional domain hint, for example `health`, `agriculture`, `finance`, `government`, or `education`
- `confidence_threshold`: optional review threshold, default `0.65`

Response:

```json
{
  "id": "trn_01J...",
  "status": "completed",
  "language": "swa",
  "language_confidence": 0.94,
  "text": "habari yako leo",
  "normalized_text": "habari yako leo",
  "translation": {
    "target_language": "eng",
    "text": "how are you today"
  },
  "duration_sec": 2.81,
  "processing_ms": 438,
  "model": "whisper-small-afrivoice-v1",
  "domain": "health",
  "confidence": 0.88,
  "needs_review": false,
  "segments": [
    {
      "start_sec": 0.0,
      "end_sec": 2.81,
      "text": "habari yako leo",
      "speaker": "SPEAKER_1",
      "confidence": 0.88,
      "needs_review": false
    }
  ]
}
```

### Async Transcription

`POST /transcriptions/jobs`

Use this for long audio or low-resource edge devices.

Response:

```json
{
  "job_id": "job_01J...",
  "status": "queued",
  "poll_url": "/api/v1/transcriptions/jobs/job_01J..."
}
```

`GET /transcriptions/jobs/{job_id}`

Response:

```json
{
  "job_id": "job_01J...",
  "status": "completed",
  "transcription_id": "trn_01J...",
  "result_url": "/api/v1/transcriptions/trn_01J..."
}
```

### Retrieve Transcript

`GET /transcriptions/{transcription_id}`

Returns the saved transcript, metadata, model version, and segment timings.

### Realtime Streaming

`WS /transcriptions/stream`

Use this for microphone input and live captions.

Client sends binary audio chunks and optional JSON config:

```json
{
  "language": null,
  "detect_language": true,
  "domain": "health",
  "return_partial": true
}
```

Server events:

```json
{
  "event": "partial",
  "language": "swa",
  "text": "habari yako",
  "start_sec": 0.0,
  "end_sec": 1.8,
  "confidence": 0.79
}
```

Final event:

```json
{
  "event": "final",
  "transcription_id": "trn_01J...",
  "text": "habari yako leo",
  "result_url": "/api/v1/transcriptions/trn_01J..."
}
```

### Delete Transcript

`DELETE /transcriptions/{transcription_id}`

Deletes transcript metadata and optionally deletes the stored audio file.

### Model Info

`GET /models/active`

Response:

```json
{
  "name": "whisper-small-afrivoice-v1",
  "architecture": "whisper-small",
  "version": "1.0.0",
  "languages": ["swa", "kik", "luo", "som", "mas", "kln"],
  "quantized": false,
  "runtime": "pytorch"
}
```

### Feedback / Correction

`POST /feedback`

Request:

```json
{
  "transcription_id": "trn_01J...",
  "corrected_text": "habari yako leo",
  "language": "swa",
  "notes": "Good language detection, minor spelling issue"
}
```

Use corrections as future fine-tuning data.

### Translate Transcript

`POST /translations`

Request:

```json
{
  "transcription_id": "trn_01J...",
  "target_language": "eng"
}
```

Response:

```json
{
  "id": "trl_01J...",
  "source_language": "swa",
  "target_language": "eng",
  "source_text": "habari yako leo",
  "translated_text": "how are you today",
  "model": "nllb-afrivoice-v1"
}
```

### Language Detection

`POST /languages/detect`

Form data:

- `file`: short audio sample

Response:

```json
{
  "language": "kik",
  "confidence": 0.91,
  "alternatives": [
    {"language": "kik", "confidence": 0.91},
    {"language": "swa", "confidence": 0.06},
    {"language": "luo", "confidence": 0.03}
  ]
}
```

### Analytics

`GET /analytics/summary`

Response:

```json
{
  "total_transcriptions": 1240,
  "average_processing_ms": 512,
  "low_confidence_rate": 0.12,
  "correction_rate": 0.08,
  "language_distribution": {
    "swa": 640,
    "kik": 170,
    "luo": 160,
    "som": 110,
    "mas": 80,
    "kln": 80
  }
}
```

### Kaggle Submission

`POST /submissions/kaggle`

Starts a reproducible prediction job for the Kaggle test dataset.

Response:

```json
{
  "submission_id": "sub_01J...",
  "status": "queued",
  "model": "whisper-small-afrivoice-v1"
}
```

## Database Schema

PostgreSQL schema:

```sql
CREATE TYPE transcription_status AS ENUM (
  'queued',
  'processing',
  'completed',
  'failed',
  'deleted'
);

CREATE TABLE languages (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  native_name TEXT,
  iso_639_3 TEXT,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE model_versions (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  architecture TEXT NOT NULL,
  version TEXT NOT NULL,
  artifact_path TEXT NOT NULL,
  runtime TEXT NOT NULL,
  quantized BOOLEAN NOT NULL DEFAULT FALSE,
  metrics JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name, version)
);

CREATE TABLE audio_uploads (
  id UUID PRIMARY KEY,
  original_filename TEXT,
  content_type TEXT,
  storage_uri TEXT NOT NULL,
  sha256 TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  duration_sec NUMERIC(10, 3),
  sample_rate INT,
  channels INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transcription_jobs (
  id UUID PRIMARY KEY,
  audio_upload_id UUID NOT NULL REFERENCES audio_uploads(id),
  requested_language_code TEXT REFERENCES languages(code),
  detected_language_code TEXT REFERENCES languages(code),
  domain TEXT,
  diarize BOOLEAN NOT NULL DEFAULT FALSE,
  translate_to TEXT,
  status transcription_status NOT NULL DEFAULT 'queued',
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transcriptions (
  id UUID PRIMARY KEY,
  job_id UUID REFERENCES transcription_jobs(id),
  audio_upload_id UUID NOT NULL REFERENCES audio_uploads(id),
  model_version_id UUID NOT NULL REFERENCES model_versions(id),
  language_code TEXT REFERENCES languages(code),
  language_confidence NUMERIC(5, 4),
  domain TEXT,
  raw_text TEXT NOT NULL,
  normalized_text TEXT NOT NULL,
  confidence NUMERIC(5, 4),
  needs_review BOOLEAN NOT NULL DEFAULT FALSE,
  duration_sec NUMERIC(10, 3),
  processing_ms INT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transcription_segments (
  id UUID PRIMARY KEY,
  transcription_id UUID NOT NULL REFERENCES transcriptions(id) ON DELETE CASCADE,
  segment_index INT NOT NULL,
  start_sec NUMERIC(10, 3) NOT NULL,
  end_sec NUMERIC(10, 3) NOT NULL,
  text TEXT NOT NULL,
  speaker_label TEXT,
  confidence NUMERIC(5, 4),
  needs_review BOOLEAN NOT NULL DEFAULT FALSE,
  tokens JSONB NOT NULL DEFAULT '[]',
  UNIQUE (transcription_id, segment_index)
);

CREATE TABLE transcription_feedback (
  id UUID PRIMARY KEY,
  transcription_id UUID NOT NULL REFERENCES transcriptions(id) ON DELETE CASCADE,
  corrected_text TEXT NOT NULL,
  language_code TEXT REFERENCES languages(code),
  wer_against_correction NUMERIC(7, 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE translations (
  id UUID PRIMARY KEY,
  transcription_id UUID NOT NULL REFERENCES transcriptions(id) ON DELETE CASCADE,
  source_language_code TEXT REFERENCES languages(code),
  target_language_code TEXT NOT NULL,
  source_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  model_version_id UUID REFERENCES model_versions(id),
  confidence NUMERIC(5, 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE language_detections (
  id UUID PRIMARY KEY,
  audio_upload_id UUID NOT NULL REFERENCES audio_uploads(id) ON DELETE CASCADE,
  detected_language_code TEXT REFERENCES languages(code),
  confidence NUMERIC(5, 4) NOT NULL,
  alternatives JSONB NOT NULL DEFAULT '[]',
  model_version_id UUID REFERENCES model_versions(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE speaker_turns (
  id UUID PRIMARY KEY,
  transcription_id UUID NOT NULL REFERENCES transcriptions(id) ON DELETE CASCADE,
  speaker_label TEXT NOT NULL,
  start_sec NUMERIC(10, 3) NOT NULL,
  end_sec NUMERIC(10, 3) NOT NULL,
  confidence NUMERIC(5, 4),
  metadata JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE kaggle_submissions (
  id UUID PRIMARY KEY,
  model_version_id UUID NOT NULL REFERENCES model_versions(id),
  dataset_name TEXT NOT NULL,
  submission_path TEXT,
  status transcription_status NOT NULL DEFAULT 'queued',
  public_score NUMERIC(8, 5),
  notes TEXT,
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE monitoring_events (
  id UUID PRIMARY KEY,
  event_type TEXT NOT NULL,
  language_code TEXT REFERENCES languages(code),
  model_version_id UUID REFERENCES model_versions(id),
  transcription_id UUID REFERENCES transcriptions(id) ON DELETE SET NULL,
  latency_ms INT,
  success BOOLEAN NOT NULL DEFAULT TRUE,
  payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transcriptions_language_created
  ON transcriptions(language_code, created_at DESC);

CREATE INDEX idx_jobs_status_created
  ON transcription_jobs(status, created_at DESC);

CREATE INDEX idx_audio_uploads_sha256
  ON audio_uploads(sha256);

CREATE INDEX idx_transcriptions_needs_review
  ON transcriptions(needs_review, created_at DESC);

CREATE INDEX idx_segments_speaker
  ON transcription_segments(transcription_id, speaker_label);

CREATE INDEX idx_monitoring_events_created
  ON monitoring_events(event_type, created_at DESC);
```

## Model Plan

### Baseline

Start with `faster-whisper` or Hugging Face Whisper.

- Use `whisper-small` or `whisper-medium` for Kaggle training experiments.
- Use `whisper-tiny/base/small` for edge constraints.
- Add language prompt tokens where supported.
- Add a language-ID pass before ASR when `language` is unknown.
- Benchmark WER per language before fine-tuning.
- Store confidence outputs for later calibration.

### Fine-tuning

Train one multilingual model:

- Mix all six languages.
- Oversample lower-resource or higher-WER languages.
- Use audio augmentations: noise, speed perturbation, volume perturbation.
- Track WER by language, domain, scripted/unscripted, and duration bucket.
- Add domain hints for health, agriculture, finance, government, education, and everyday speech.
- Use accepted human corrections as an additional supervised fine-tuning set.
- Save best checkpoint by average WER and worst-language WER.

### Language ID

Train or adapt a compact classifier:

- Input: 3-10 second audio windows.
- Output: one of `swa`, `kik`, `luo`, `som`, `mas`, `kln`.
- Metric: macro F1 and confusion matrix by language.
- Runtime: small enough to run before ASR on CPU.

### Diarization

Use diarization when `diarize=true`:

- Start with pyannote.audio or NeMo for server mode.
- Store speaker turns separately and attach speaker labels to segments.
- Disable by default for edge mode unless latency allows it.

### Translation

Keep translation as optional post-processing:

- Translate from source language to English or Swahili.
- Store translation output separately from ASR transcript.
- Track translation model/version independently.

### Edge Deployment

Export the best model:

- CTranslate2 int8 for CPU inference.
- ONNX Runtime for mobile/desktop.
- TFLite only if model architecture supports a clean conversion path.

Runtime modes:

- Server mode: highest accuracy, GPU or CPU.
- Edge mode: quantized model, offline, lower memory.
- Batch mode: offline folder transcription.
- Streaming mode: chunked inference for microphone input.
- Mobile/offline mode: local transcript storage with later sync.

## Implementation Steps

### Phase 1: Data and Baseline

1. Create the repo and install dependencies.
2. Download Hugging Face and Kaggle datasets.
3. Build manifest converters for each dataset.
4. Run a data audit: language counts, hours, transcript length, corrupt audio.
5. Normalize audio to 16 kHz mono.
6. Run baseline inference with a pretrained Whisper model.
7. Add baseline language detection.
8. Compute WER overall and per language.
9. Produce a first Kaggle submission file.

### Phase 2: Training

1. Create balanced multilingual train/validation splits.
2. Fine-tune Whisper/XLS-R with language-aware metadata.
3. Evaluate per language and inspect failure cases.
4. Tune normalization rules for punctuation, casing, tags, and numerals.
5. Train or calibrate the language-ID model.
6. Add confidence calibration and low-confidence review flags.
7. Generate Kaggle-compatible predictions for test data.

### Phase 3: Backend

1. Implement FastAPI app.
2. Add `/health`, `/languages`, `/languages/detect`, `/transcriptions`, `/transcriptions/jobs`, `/transcriptions/stream`, `/models/active`, `/translations`, `/feedback`, `/analytics/summary`, and `/submissions/kaggle`.
3. Add Postgres models and migrations.
4. Store uploaded audio and transcript outputs.
5. Add async worker for long audio.
6. Add human correction export for future fine-tuning.
7. Add integration tests for upload, inference, streaming, persistence, translation, feedback, and retrieval.

### Phase 4: Edge and Offline

1. Export model to CTranslate2 or ONNX.
2. Add local model cache and offline startup mode.
3. Benchmark latency, memory, and WER on CPU.
4. Add chunked/streaming transcription for longer recordings.
5. Package with Docker and a lightweight CLI.
6. Add offline transcript history with SQLite.
7. Add optional sync endpoint for offline-collected transcripts and corrections.

### Phase 5: Demo

1. Build a minimal web/mobile recording UI.
2. Show language detection and transcript segments.
3. Show saved transcript history.
4. Include per-language model metrics.
5. Show low-confidence segments and correction workflow.
6. Show optional translation to English or Swahili.
7. Show speaker diarization for interview-style audio.
8. Prepare a Kaggle submission script and model card.

### Phase 6: Monitoring and Improvement

1. Add request latency and failure monitoring.
2. Track language distribution and low-confidence rate.
3. Track correction rate and feedback quality.
4. Export accepted corrections into the next training manifest.
5. Compare model versions before activating a new model.

## First Commands

```bash
mkdir afrivoice-eac-asr
cd afrivoice-eac-asr
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy alembic psycopg[binary] pydantic-settings python-multipart
pip install torch torchaudio transformers datasets evaluate jiwer librosa soundfile ffmpeg-python
pip install faster-whisper kagglehub
pip install ctranslate2 onnxruntime
pip install prometheus-client
```

Optional integrations:

```bash
pip install pyannote.audio
pip install sentencepiece sacremoses
```

Download Kaggle test data:

```python
import kagglehub

path = kagglehub.dataset_download("digitalumuganda/anv-test-data-nt")
print("Path to dataset files:", path)
```

Load Hugging Face data:

```python
from datasets import load_dataset

swahili = load_dataset("DigitalUmuganda/Afrivoice_Swahili")
kenya = load_dataset("MCAA1-MSU/anv_data_ke")
```

## Success Metrics

- Primary: WER on Kaggle hidden/public test set.
- Secondary: WER per language, especially worst-language WER.
- Product: transcription latency, memory footprint, offline startup time.
- Reliability: upload success rate, corrupt audio handling, job failure rate.
- Language ID: macro F1 and per-language confusion matrix.
- Confidence: low-confidence recall, calibration error, review precision.
- Diarization: diarization error rate when speaker labels are available.
- Translation: human review score or chrF/BLEU when references are available.
- Feedback loop: accepted correction count and WER improvement after retraining.
- Monitoring: p95 latency, failure rate, model load time, and queue time.

## Risks and Mitigations

- Language imbalance: oversample low-resource languages and report per-language WER.
- Domain mismatch: preserve domain metadata and evaluate by domain.
- Scripted vs unscripted gap: train/evaluate both separately.
- Edge constraints: keep one quantized model variant and one accuracy-first model variant.
- Data access gates: cache manifests and document accepted dataset terms.
- Language detection errors: allow manual language override and store alternatives.
- Low confidence outputs: expose review flags instead of hiding uncertainty.
- Diarization cost: keep diarization optional and disabled by default on edge.
- Translation hallucination risk: mark translations as derived output and preserve original transcript.
- Feedback data noise: require accepted/validated corrections before fine-tuning.
