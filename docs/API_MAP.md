# API Map

## Core

- `GET /api/v1/health`
- `GET /api/v1/models/active`
- `GET /api/v1/languages`

## Speech

- `POST /api/v1/transcriptions`
- `GET /api/v1/transcriptions`
- `GET /api/v1/transcriptions/{id}`
- `GET /api/v1/transcriptions/{id}/audio`
- `DELETE /api/v1/transcriptions/{id}`
- `POST /api/v1/transcriptions/batch`
- `WebSocket /api/v1/transcriptions/stream`

## Review and Operations

- `POST /api/v1/ops/reviews/assign`
- `POST /api/v1/ops/reviews/status`
- `GET /api/v1/ops/reviews`
- `POST /api/v1/ops/jobs`
- `GET /api/v1/ops/jobs`
- `POST /api/v1/ops/evaluations`
- `GET /api/v1/ops/evaluations`
- `GET /api/v1/ops/deployment/readiness`

## Integrations

- `GET /api/v1/integrations/model-adapters`
- `POST /api/v1/integrations/model-adapters/select`
- `GET /api/v1/integrations/datasets/sync-status`
- `POST /api/v1/integrations/datasets/kaggle/sync`
- `POST /api/v1/integrations/datasets/huggingface/sync`
- `GET /api/v1/integrations/training/jobs`
- `POST /api/v1/integrations/training/jobs`

## Submission

- `POST /api/v1/submissions/kaggle`

