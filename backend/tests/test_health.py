from fastapi.testclient import TestClient

from app.main import app


def test_health() -> None:
    client = TestClient(app)
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_homepage() -> None:
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert "East African Speech Recognition Operations Console" in response.text
    assert "Code / API Integration" in response.text
    assert "Transcript History" in response.text


def test_public_profile_route() -> None:
    client = TestClient(app)
    response = client.get("/@michael-owusu-prempeh")
    assert response.status_code == 200
    assert "Your public profile URL" in response.text
    assert "Public Profile" in response.text


def test_lab_endpoints() -> None:
    client = TestClient(app)

    comparison = client.get("/api/v1/lab/model-comparison")
    assert comparison.status_code == 200
    assert comparison.json()["winner"] == "afrivoice-finetuned-small"

    leaderboard = client.get("/api/v1/lab/leaderboard")
    assert leaderboard.status_code == 200
    assert len(leaderboard.json()["languages"]) == 6

    wer = client.post(
        "/api/v1/lab/wer",
        json={"reference": "habari yako leo", "prediction": "habari yako"},
    )
    assert wer.status_code == 200
    assert wer.json()["wer"] == 0.3333

    accuracy = client.post(
        "/api/v1/lab/accuracy",
        json={
            "samples": [
                {"language": "swa", "reference": "habari yako leo", "prediction": "habari yako leo"},
                {"language": "mas", "reference": "inkishu apa oleng", "prediction": "inkishu apa"},
            ]
        },
    )
    assert accuracy.status_code == 200
    payload = accuracy.json()
    assert payload["sample_count"] == 2
    assert payload["overall"]["accuracy"] > 0
    assert len(payload["by_language"]) == 2

    activity = client.get("/api/v1/lab/activity-detail")
    assert activity.status_code == 200
    assert activity.json()["summary"]["views"]["value"] == 35

    backend = client.get("/api/v1/lab/backend-status")
    assert backend.status_code == 200
    assert backend.json()["services"][0]["status"] == "healthy"


def test_transcription_history_endpoint() -> None:
    client = TestClient(app)
    response = client.get("/api/v1/transcriptions")
    assert response.status_code == 200
    payload = response.json()
    assert "count" in payload
    assert "items" in payload


def test_integration_endpoints() -> None:
    client = TestClient(app)

    adapters = client.get("/api/v1/integrations/model-adapters")
    assert adapters.status_code == 200
    assert any(item["id"] == "faster_whisper" for item in adapters.json()["adapters"])

    kaggle = client.post(
        "/api/v1/integrations/datasets/kaggle/sync",
        json={"source": "kaggle", "dataset_id": "digitalumuganda/anv-test-data-nt"},
    )
    assert kaggle.status_code == 200
    assert kaggle.json()["status"] in {"completed", "needs_dependency"}
    assert "manifest_target" in kaggle.json()

    training = client.get("/api/v1/integrations/training/jobs")
    assert training.status_code == 200
    assert "jobs" in training.json()

    roles = client.get("/api/v1/integrations/roles")
    assert roles.status_code == 200
    assert roles.json()["roles"][0]["role"] == "Admin"

    export = client.post("/api/v1/integrations/deployment/export", json={})
    assert export.status_code == 200
    assert export.json()["status"] == "queued"

    tts = client.post(
        "/api/v1/integrations/tts",
        json={"text": "habari yako leo", "source_language": "swa", "target_language": "swa"},
    )
    assert tts.status_code == 200
    assert tts.json()["status"] == "tts_audio_created"
    assert tts.json()["audio_url"].endswith(".wav")


def test_kaggle_submission_builder_creates_csv() -> None:
    client = TestClient(app)
    requirements = client.get("/api/v1/submissions/requirements")
    assert requirements.status_code == 200
    assert requirements.json()["required_columns"] == ["id", "language", "prediction"]

    response = client.post("/api/v1/submissions/kaggle", json={"sample_count": 3})
    assert response.status_code == 200
    payload = response.json()
    assert payload["validation"]["required_columns"] == ["id", "language", "prediction"]
    assert payload["validation"]["ready_for_download"] is True
    assert payload["validation"]["no_manual_test_transcription"] is True
    assert payload["submission_path"].endswith(".csv")
    assert len(payload["preview_rows"]) >= 2
    assert set(payload["preview_rows"][0].keys()) == {"id", "language", "prediction"}
    assert payload["preview_rows"][0]["language"] in {"swa", "kik", "luo", "som", "mas", "kln"}
    assert payload["hardware_validation_report"]["latency_report_required"] is True
