from datetime import UTC, datetime


def utc_now() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


def utc_now_iso() -> str:
    return f"{utc_now().isoformat()}Z"
