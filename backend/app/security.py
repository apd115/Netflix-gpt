import hashlib
import secrets
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from .config import settings

# ---------- Passwords ----------
password_hasher = PasswordHash.recommended()

# A real hash of a throwaway password. Used at login when the email doesn't
# exist, so that case takes the same time as a wrong password (see login()).
DUMMY_HASH = password_hasher.hash("not-a-real-password")


def hash_password(plain_password: str) -> str:
    return password_hasher.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hasher.verify(plain_password, hashed_password)


# ---------- Access tokens (JWT) ----------
def create_access_token(user_id: int) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),  # "subject": who this token is about
        "iat": now,  # "issued at"
        "exp": now + timedelta(minutes=settings.ACCESS_TOKEN_MINUTES),  # "expires"
        "type": "access",
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> int | None:
    """Return the user id inside a valid access token, or None if anything is wrong."""
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],  # we decide the algorithm, not the token
            options={"require": ["exp", "sub"]},
        )
        if payload.get("type") != "access":
            return None
        return int(payload["sub"])
    except (jwt.PyJWTError, ValueError):
        return None


# ---------- Refresh tokens ----------
def generate_refresh_token() -> str:
    """A random, unguessable string. Not a JWT: it carries no data at all."""
    return secrets.token_urlsafe(48)


def hash_token(raw_token: str) -> str:
    """SHA-256 is fine here (unlike passwords) because the input is already
    long and random, so there is nothing for an attacker to guess."""
    return hashlib.sha256(raw_token.encode()).hexdigest()


def generate_reset_token() -> str:
    """Same idea as a refresh token: random, unguessable, carries no data."""
    return secrets.token_urlsafe(48)
