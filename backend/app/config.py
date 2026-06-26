from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AfriVoice EAC ASR"
    environment: str = "development"
    database_url: str = "sqlite:///./outputs/local_data/afrivoice.db"
    upload_dir: Path = Path("outputs/local_data/uploads")
    model_name: str = "mock-afrivoice-asr-v0"
    model_runtime: str = "mock"
    asr_adapter: str = "mock"
    confidence_threshold: float = 0.65
    auth_secret: str = "change-me-local-development-secret"
    storage_backend: str = "local"
    cloud_bucket: str | None = None
    cloud_prefix: str = "afrivoice/audio"
    queue_backend: str = "local"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/1"
    kaggle_dataset_id: str = "digitalumuganda/anv-test-data-nt"
    local_kaggle_dataset_path: Path = Path("/Users/michaelprempeh/Downloads/anv-test-data-nt (2)")
    hf_datasets: str = "DigitalUmuganda/Afrivoice_Swahili,MCAA1-MSU/anv_data_ke,DigitalUmuganda/Afrivoice"
    tts_backend: str = "local_wave"
    tts_output_dir: Path = Path("outputs/local_data/tts")

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", protected_namespaces=())


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    settings.tts_output_dir.mkdir(parents=True, exist_ok=True)
    return settings
