from sqlalchemy.orm import Session

from app.config import get_settings
from app.db.models import Language, ModelVersion


LANGUAGES = [
    ("swa", "Swahili", "Kiswahili"),
    ("kik", "Kikuyu", "Gikuyu"),
    ("luo", "Luo / Dholuo", "Dholuo"),
    ("som", "Somali", "Soomaali"),
    ("mas", "Maasai", "Maa"),
    ("kln", "Kalenjin", "Kalenjin"),
]


def seed_reference_data(db: Session) -> ModelVersion:
    for code, name, native_name in LANGUAGES:
        if not db.get(Language, code):
            db.add(Language(code=code, name=name, native_name=native_name))

    settings = get_settings()
    model = db.query(ModelVersion).filter(ModelVersion.is_active.is_(True)).first()
    if not model:
        model = ModelVersion(
            name=settings.model_name,
            architecture="mock-unified-asr",
            version="0.1.0",
            artifact_path="outputs/local_data/models/mock",
            runtime=settings.model_runtime,
            quantized=False,
            is_active=True,
        )
        db.add(model)

    db.commit()
    db.refresh(model)
    return model

