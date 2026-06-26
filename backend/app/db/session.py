from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.config import get_settings


settings = get_settings()
connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
_initialized = False


class Base(DeclarativeBase):
    pass


def init_db() -> None:
    global _initialized
    from app.db import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    _initialized = True


def get_db() -> Generator[Session, None, None]:
    if not _initialized:
        init_db()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
