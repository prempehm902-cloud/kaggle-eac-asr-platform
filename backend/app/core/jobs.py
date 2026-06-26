from app.config import get_settings


def enqueue_background_job(job_name: str, payload: dict) -> dict:
    settings = get_settings()
    if settings.queue_backend == "celery":
        try:
            from celery import Celery
        except ImportError as exc:
            raise RuntimeError("Install celery and redis to use QUEUE_BACKEND=celery") from exc
        app = Celery("afrivoice", broker=settings.celery_broker_url, backend=settings.celery_result_backend)
        task = app.send_task(job_name, kwargs=payload)
        return {"queue_backend": "celery", "task_id": task.id, "status": "queued"}

    if settings.queue_backend == "local":
        return {"queue_backend": "local", "task_id": None, "status": "running"}

    raise RuntimeError(f"Unsupported QUEUE_BACKEND={settings.queue_backend}")
