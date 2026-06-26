"""production platform tables

Revision ID: 20260619_0001
Revises:
Create Date: 2026-06-19
"""

from alembic import op
import sqlalchemy as sa

revision = "20260619_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("email", sa.String(length=180), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(length=180), nullable=False),
        sa.Column("role", sa.String(length=40), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "workspaces",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("owner_user_id", sa.String(length=36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("purpose", sa.String(length=120), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "transcription_ownership",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("transcription_id", sa.String(length=36), sa.ForeignKey("transcriptions.id"), nullable=False),
        sa.Column("user_id", sa.String(length=36), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("workspace_id", sa.String(length=36), sa.ForeignKey("workspaces.id"), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "background_jobs",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("workspace_id", sa.String(length=36), sa.ForeignKey("workspaces.id"), nullable=True),
        sa.Column("job_type", sa.String(length=80), nullable=False),
        sa.Column("status", sa.String(length=40), nullable=True),
        sa.Column("progress", sa.Integer(), nullable=True),
        sa.Column("logs", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "evaluation_runs",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("workspace_id", sa.String(length=36), sa.ForeignKey("workspaces.id"), nullable=True),
        sa.Column("model_name", sa.String(length=120), nullable=False),
        sa.Column("dataset_name", sa.String(length=120), nullable=False),
        sa.Column("wer", sa.Float(), nullable=True),
        sa.Column("cer", sa.Float(), nullable=True),
        sa.Column("status", sa.String(length=40), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "review_assignments",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("transcription_id", sa.String(length=36), sa.ForeignKey("transcriptions.id"), nullable=False),
        sa.Column("assignee_user_id", sa.String(length=36), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("status", sa.String(length=40), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "audit_logs",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("user_id", sa.String(length=36), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("workspace_id", sa.String(length=36), sa.ForeignKey("workspaces.id"), nullable=True),
        sa.Column("action", sa.String(length=80), nullable=False),
        sa.Column("entity_type", sa.String(length=80), nullable=True),
        sa.Column("entity_id", sa.String(length=80), nullable=True),
        sa.Column("detail", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "project_settings",
        sa.Column("key", sa.String(length=120), primary_key=True),
        sa.Column("value", sa.Text(), nullable=False),
        sa.Column("updated_by_user_id", sa.String(length=36), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
    )


def downgrade() -> None:
    op.drop_table("project_settings")
    op.drop_table("audit_logs")
    op.drop_table("review_assignments")
    op.drop_table("evaluation_runs")
    op.drop_table("background_jobs")
    op.drop_table("transcription_ownership")
    op.drop_table("workspaces")
    op.drop_table("users")
