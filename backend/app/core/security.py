import hashlib
import hmac
import secrets

import bcrypt


def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=12))
    return f"bcrypt${hashed.decode('utf-8')}"


def _verify_legacy_sha256(password: str, stored: str) -> bool:
    salt, digest = stored.split("$", 1)
    candidate = hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()
    return hmac.compare_digest(candidate, digest)


def verify_password(password: str, stored: str) -> bool:
    if stored.startswith("bcrypt$"):
        hashed = stored.removeprefix("bcrypt$").encode("utf-8")
        return bcrypt.checkpw(password.encode("utf-8"), hashed)
    if "$" in stored:
        return _verify_legacy_sha256(password, stored)
    return False


def legacy_hash_password(password: str, salt: str | None = None) -> str:
    salt = salt or secrets.token_hex(12)
    digest = hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()
    return f"{salt}${digest}"
