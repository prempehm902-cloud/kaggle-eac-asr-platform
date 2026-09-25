# Contributing

Thank you for helping improve AfriVoice EAC ASR. Contributions that improve language coverage, evaluation quality, accessibility, reliability, or documentation are welcome.

## Development setup

```bash
git clone https://github.com/prempehm902-cloud/kaggle-eac-asr-platform.git
cd kaggle-eac-asr-platform
./scripts/bootstrap_local.sh
source .venv/bin/activate
make run
```

## Before opening a pull request

1. Create a focused branch from `main`.
2. Keep raw audio, model weights, secrets, databases, and generated files out of Git.
3. Add or update tests for behavioral changes.
4. Run `make test` and `make smoke` where applicable.
5. Explain the user impact, test evidence, and any model or dataset licensing considerations.

## Repository conventions

- API routes belong in `backend/app/api/v1/`.
- Business workflows belong in `backend/app/services/`.
- reusable ASR logic belongs in `backend/app/core/`.
- Dataset, evaluation, and export pipelines belong in `backend/ml/`.
- Product documentation and screenshots belong in `docs/`.
- Runtime output belongs in `outputs/local_data/` and must remain untracked.

Please do not include private speech recordings or personally identifiable data in issues, pull requests, fixtures, or screenshots.
