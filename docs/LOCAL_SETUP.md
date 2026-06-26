# Local Setup

This project is ready to open directly in PyCharm from:

`/Users/michaelprempeh/Documents/Codex/Kaggle/Kaggle`

## PyCharm

1. Open the folder above as the project root.
2. Set the Python interpreter to `.venv/bin/python` if the virtual environment already exists.
3. If `.venv` does not exist, run:

```bash
./scripts/bootstrap_local.sh
```

4. Add a run configuration:
   - Type: Python
   - Module name: `uvicorn`
   - Parameters: `app.main:app --reload --host 127.0.0.1 --port 8000`
   - Working directory: project root
   - Environment variables: `PYTHONPATH=backend`
   - Environment file: `.env`

## Local URLs

- Website: `http://127.0.0.1:8000`
- API docs: `http://127.0.0.1:8000/docs`
- Health: `http://127.0.0.1:8000/api/v1/health`

## Folder Layout

- `frontend/`: dashboard HTML, CSS, and JavaScript
- `backend/app/`: FastAPI backend application
- `backend/tests/`: backend tests
- `backend/ml/`: ASR data/evaluation/export helpers
- `backend/edge/`: offline CLI tooling

## Useful Commands

```bash
make install
make run
make test
make smoke
make clean
```
