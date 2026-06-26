import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.time import utc_now
from app.db.session import Base


def uuid_str() -> str:
    return str(uuid.uuid4())


class Language(Base):
    __tablename__ = "languages"

    code: Mapped[str] = mapped_column(String(8), primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    native_name: Mapped[str | None] = mapped_column(String(80))
    enabled: Mapped[bool] = mapped_column(Boolean, default=True)


class ModelVersion(Base):
    __tablename__ = "model_versions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    architecture: Mapped[str] = mapped_column(String(120), nullable=False)
    version: Mapped[str] = mapped_column(String(40), nullable=False)
    artifact_path: Mapped[str] = mapped_column(String(300), nullable=False)
    runtime: Mapped[str] = mapped_column(String(80), nullable=False)
    quantized: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class AudioUpload(Base):
    __tablename__ = "audio_uploads"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    original_filename: Mapped[str | None] = mapped_column(String(255))
    content_type: Mapped[str | None] = mapped_column(String(120))
    storage_uri: Mapped[str] = mapped_column(String(400), nullable=False)
    sha256: Mapped[str] = mapped_column(String(64), nullable=False)
    size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class Transcription(Base):
    __tablename__ = "transcriptions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    audio_upload_id: Mapped[str] = mapped_column(ForeignKey("audio_uploads.id"), nullable=False)
    model_version_id: Mapped[str] = mapped_column(ForeignKey("model_versions.id"), nullable=False)
    language_code: Mapped[str | None] = mapped_column(String(8), ForeignKey("languages.code"))
    language_confidence: Mapped[float | None] = mapped_column(Float)
    domain: Mapped[str | None] = mapped_column(String(80))
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)
    normalized_text: Mapped[str] = mapped_column(Text, nullable=False)
    confidence: Mapped[float | None] = mapped_column(Float)
    needs_review: Mapped[bool] = mapped_column(Boolean, default=False)
    processing_ms: Mapped[int | None] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)

    audio_upload: Mapped[AudioUpload] = relationship()
    segments: Mapped[list["TranscriptionSegment"]] = relationship(cascade="all, delete-orphan")


class TranscriptionSegment(Base):
    __tablename__ = "transcription_segments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    transcription_id: Mapped[str] = mapped_column(ForeignKey("transcriptions.id"), nullable=False)
    segment_index: Mapped[int] = mapped_column(Integer, nullable=False)
    start_sec: Mapped[float] = mapped_column(Float, nullable=False)
    end_sec: Mapped[float] = mapped_column(Float, nullable=False)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    speaker_label: Mapped[str | None] = mapped_column(String(40))
    confidence: Mapped[float | None] = mapped_column(Float)
    needs_review: Mapped[bool] = mapped_column(Boolean, default=False)


class Translation(Base):
    __tablename__ = "translations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    transcription_id: Mapped[str] = mapped_column(ForeignKey("transcriptions.id"), nullable=False)
    source_language_code: Mapped[str | None] = mapped_column(String(8))
    target_language_code: Mapped[str] = mapped_column(String(8), nullable=False)
    source_text: Mapped[str] = mapped_column(Text, nullable=False)
    translated_text: Mapped[str] = mapped_column(Text, nullable=False)
    confidence: Mapped[float | None] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class Feedback(Base):
    __tablename__ = "transcription_feedback"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    transcription_id: Mapped[str] = mapped_column(ForeignKey("transcriptions.id"), nullable=False)
    corrected_text: Mapped[str] = mapped_column(Text, nullable=False)
    language_code: Mapped[str | None] = mapped_column(String(8))
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class KaggleSubmission(Base):
    __tablename__ = "kaggle_submissions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    model_version_id: Mapped[str] = mapped_column(ForeignKey("model_versions.id"), nullable=False)
    dataset_name: Mapped[str] = mapped_column(String(180), nullable=False)
    submission_path: Mapped[str | None] = mapped_column(String(400))
    status: Mapped[str] = mapped_column(String(40), default="queued")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(180), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(180), nullable=False)
    role: Mapped[str] = mapped_column(String(40), default="Reviewer")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class Workspace(Base):
    __tablename__ = "workspaces"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    owner_user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    purpose: Mapped[str] = mapped_column(String(120), default="Kaggle submission")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class TranscriptionOwnership(Base):
    __tablename__ = "transcription_ownership"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    transcription_id: Mapped[str] = mapped_column(ForeignKey("transcriptions.id"), nullable=False)
    user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"))
    workspace_id: Mapped[str | None] = mapped_column(ForeignKey("workspaces.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class BackgroundJob(Base):
    __tablename__ = "background_jobs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    workspace_id: Mapped[str | None] = mapped_column(ForeignKey("workspaces.id"))
    job_type: Mapped[str] = mapped_column(String(80), nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="queued")
    progress: Mapped[int] = mapped_column(Integer, default=0)
    logs: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class EvaluationRun(Base):
    __tablename__ = "evaluation_runs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    workspace_id: Mapped[str | None] = mapped_column(ForeignKey("workspaces.id"))
    model_name: Mapped[str] = mapped_column(String(120), nullable=False)
    dataset_name: Mapped[str] = mapped_column(String(120), nullable=False)
    wer: Mapped[float] = mapped_column(Float, default=0.0)
    cer: Mapped[float] = mapped_column(Float, default=0.0)
    status: Mapped[str] = mapped_column(String(40), default="completed")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class ReviewAssignment(Base):
    __tablename__ = "review_assignments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    transcription_id: Mapped[str] = mapped_column(ForeignKey("transcriptions.id"), nullable=False)
    assignee_user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"))
    status: Mapped[str] = mapped_column(String(40), default="assigned")
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"))
    workspace_id: Mapped[str | None] = mapped_column(ForeignKey("workspaces.id"))
    action: Mapped[str] = mapped_column(String(80), nullable=False)
    entity_type: Mapped[str | None] = mapped_column(String(80))
    entity_id: Mapped[str | None] = mapped_column(String(80))
    detail: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)


class ProjectSetting(Base):
    __tablename__ = "project_settings"

    key: Mapped[str] = mapped_column(String(120), primary_key=True)
    value: Mapped[str] = mapped_column(Text, nullable=False)
    updated_by_user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"))
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now)
