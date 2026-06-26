from fastapi import APIRouter

from app.api.v1 import analytics, audit, auth, feedback, health, integrations, lab, languages, models, ops, settings, submissions, transcriptions, translations, workspaces

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(languages.router, prefix="/languages", tags=["languages"])
api_router.include_router(transcriptions.router, prefix="/transcriptions", tags=["transcriptions"])
api_router.include_router(models.router, prefix="/models", tags=["models"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])
api_router.include_router(translations.router, prefix="/translations", tags=["translations"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(submissions.router, prefix="/submissions", tags=["submissions"])
api_router.include_router(lab.router, prefix="/lab", tags=["asr-lab"])
api_router.include_router(integrations.router, prefix="/integrations", tags=["integrations"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(workspaces.router, prefix="/workspaces", tags=["workspaces"])
api_router.include_router(ops.router, prefix="/ops", tags=["operations"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(audit.router, prefix="/audit-logs", tags=["audit"])
