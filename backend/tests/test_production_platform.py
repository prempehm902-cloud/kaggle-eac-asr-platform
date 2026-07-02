from io import BytesIO
from time import time

from fastapi.testclient import TestClient

from app.main import app


def _register(client: TestClient, role: str = "Reviewer") -> tuple[dict, dict]:
    email = f"{role.lower()}-{time()}@example.com"
    response = client.post(
        "/api/v1/auth/register",
        json={"name": f"{role} User", "email": email, "password": "password123", "role": role},
    )
    assert response.status_code == 200
    payload = response.json()
    return payload, {"Authorization": f"Bearer {payload['access_token']}"}


def test_auth_returns_token_and_default_workspaces() -> None:
    client = TestClient(app)
    user, headers = _register(client, "Admin")

    assert user["token_type"] == "bearer"
    assert len(user["workspaces"]) == 4

    me = client.get("/api/v1/auth/me", headers=headers)
    assert me.status_code == 200
    assert me.json()["email"] == user["email"]


def test_register_existing_email_with_same_password_returns_session() -> None:
    client = TestClient(app)
    email = f"repeat-{time()}@example.com"
    payload = {"name": "Repeat User", "email": email, "password": "password123", "role": "Reviewer"}

    first = client.post("/api/v1/auth/register", json=payload)
    assert first.status_code == 200
    second = client.post("/api/v1/auth/register", json=payload)
    assert second.status_code == 200
    second_payload = second.json()
    assert second_payload["status"] == "signed_in_existing_account"
    assert second_payload["email"] == email
    assert second_payload["access_token"]

    wrong_password = client.post("/api/v1/auth/register", json={**payload, "password": "wrong-password"})
    assert wrong_password.status_code == 409


def test_workspace_owned_transcription_can_replay_and_delete() -> None:
    client = TestClient(app)
    user, headers = _register(client, "Reviewer")
    workspace_id = user["active_workspace_id"]

    created = client.post(
        "/api/v1/transcriptions",
        data={"language": "swa", "detect_language": "true", "workspace_id": workspace_id},
        files={"file": ("speech.wav", BytesIO(b"fake-wav-content"), "audio/wav")},
        headers=headers,
    )
    assert created.status_code == 200
    transcription_id = created.json()["id"]

    history = client.get("/api/v1/transcriptions", headers=headers)
    assert history.status_code == 200
    assert any(item["id"] == transcription_id for item in history.json()["items"])

    audio = client.get(f"/api/v1/transcriptions/{transcription_id}/audio", headers=headers)
    assert audio.status_code == 200

    deleted = client.delete(f"/api/v1/transcriptions/{transcription_id}", headers=headers)
    assert deleted.status_code == 200
    assert deleted.json()["status"] == "deleted"


def test_role_permissions_block_viewer_jobs_and_allow_reviewer_jobs() -> None:
    client = TestClient(app)
    viewer, viewer_headers = _register(client, "Viewer")
    reviewer, reviewer_headers = _register(client, "Reviewer")

    blocked = client.post(
        "/api/v1/ops/jobs",
        json={"job_type": "batch-transcription", "workspace_id": viewer["active_workspace_id"]},
        headers=viewer_headers,
    )
    assert blocked.status_code == 403

    allowed = client.post(
        "/api/v1/ops/jobs",
        json={"job_type": "batch-transcription", "workspace_id": reviewer["active_workspace_id"]},
        headers=reviewer_headers,
    )
    assert allowed.status_code == 200
    assert allowed.json()["status"] == "running"


def test_evaluation_settings_and_audit_logs() -> None:
    client = TestClient(app)
    admin, headers = _register(client, "Admin")

    evaluation = client.post(
        "/api/v1/ops/evaluations",
        json={
            "workspace_id": admin["active_workspace_id"],
            "model_name": "Fine-tuned AfriVoice",
            "dataset_name": "AfriVoice validation",
        },
        headers=headers,
    )
    assert evaluation.status_code == 200
    assert evaluation.json()["status"] == "completed"

    settings = client.patch(
        "/api/v1/settings",
        json={"default_model": "whisper", "export_format": "csv"},
        headers=headers,
    )
    assert settings.status_code == 200
    assert settings.json()["project"]["default_model"] == "whisper"

    logs = client.get("/api/v1/audit-logs", headers=headers)
    assert logs.status_code == 200
    actions = {item["action"] for item in logs.json()["items"]}
    assert "evaluation.create" in actions
    assert "settings.update" in actions
