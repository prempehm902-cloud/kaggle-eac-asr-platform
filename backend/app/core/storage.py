import hashlib
from pathlib import Path

from fastapi import UploadFile

from app.config import get_settings


class StoredAudio:
    def __init__(self, uri: str, digest: str, size: int, local_path: Path | None = None) -> None:
        self.uri = uri
        self.digest = digest
        self.size = size
        self.local_path = local_path


async def save_audio(file: UploadFile) -> StoredAudio:
    settings = get_settings()
    data = await file.read()
    digest = hashlib.sha256(data).hexdigest()
    suffix = Path(file.filename or "audio.wav").suffix or ".wav"
    object_name = f"{settings.cloud_prefix.rstrip('/')}/{digest}{suffix}"
    local_cache_path = settings.upload_dir / f"{digest}{suffix}"

    if settings.storage_backend == "local":
        local_cache_path.write_bytes(data)
        return StoredAudio(str(local_cache_path), digest, len(data), local_cache_path)

    if settings.storage_backend == "s3":
        try:
            import boto3
        except ImportError as exc:
            raise RuntimeError("Install boto3 to use STORAGE_BACKEND=s3") from exc
        if not settings.cloud_bucket:
            raise RuntimeError("CLOUD_BUCKET is required for S3 storage")
        boto3.client("s3").put_object(Bucket=settings.cloud_bucket, Key=object_name, Body=data, ContentType=file.content_type)
        local_cache_path.write_bytes(data)
        return StoredAudio(f"s3://{settings.cloud_bucket}/{object_name}", digest, len(data), local_cache_path)

    if settings.storage_backend == "gcs":
        try:
            from google.cloud import storage
        except ImportError as exc:
            raise RuntimeError("Install google-cloud-storage to use STORAGE_BACKEND=gcs") from exc
        if not settings.cloud_bucket:
            raise RuntimeError("CLOUD_BUCKET is required for GCS storage")
        bucket = storage.Client().bucket(settings.cloud_bucket)
        blob = bucket.blob(object_name)
        blob.upload_from_string(data, content_type=file.content_type)
        local_cache_path.write_bytes(data)
        return StoredAudio(f"gs://{settings.cloud_bucket}/{object_name}", digest, len(data), local_cache_path)

    if settings.storage_backend == "supabase":
        if not settings.cloud_bucket:
            raise RuntimeError("CLOUD_BUCKET must be the Supabase storage bucket name")
        local_cache_path.write_bytes(data)
        return StoredAudio(f"supabase://{settings.cloud_bucket}/{object_name}", digest, len(data), local_cache_path)

    raise RuntimeError(f"Unsupported STORAGE_BACKEND={settings.storage_backend}")


def local_path_from_uri(uri: str) -> Path | None:
    if uri.startswith(("s3://", "gs://", "supabase://")):
        return None
    return Path(uri)


def local_cache_path(digest: str, filename: str | None = None) -> Path:
    settings = get_settings()
    suffix = Path(filename or "audio.wav").suffix or ".wav"
    return settings.upload_dir / f"{digest}{suffix}"
