from pathlib import Path

from fastapi import UploadFile

from app.core.storage import save_audio


async def save_upload(file: UploadFile) -> tuple[Path, str, int, str]:
    stored = await save_audio(file)
    local_path = stored.local_path or Path(stored.uri)
    return local_path, stored.digest, stored.size, stored.uri
