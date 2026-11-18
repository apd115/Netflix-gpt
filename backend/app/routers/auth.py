import uuid
from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..config import settings
from ..dependencies import get_current_user, get_db
from ..models import RefreshToken, User, utcnow
from ..rate_limit import rate_limit
from ..schemas import LoginRequest, RegisterRequest, TokenResponse, UserResponse
from ..security import (
    DUMMY_HASH,
    create_access_token,
    generate_refresh_token,
    hash_password,
    hash_token,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])

COOKIE_PATH = "/auth"  # the browser only sends the cookie to /auth/* URLs


# ---------- helpers ----------
def _new_refresh_token(db: Session, user_id: int, family_id: str) -> str:
    """Create a refresh token row and return the RAW token (shown only once)."""
    raw = generate_refresh_token()
    db.add(
        RefreshToken(
            user_id=user_id,
            token_hash=hash_token(raw),
            family_id=family_id,
            expires_at=utcnow() + timedelta(days=settings.REFRESH_TOKEN_DAYS),
        )
    )
    return raw


def _set_refresh_cookie(response: Response, raw_token: str) -> None:
    response.set_cookie(
        key=settings.REFRESH_COOKIE_NAME,
        value=raw_token,
        max_age=settings.REFRESH_TOKEN_DAYS * 24 * 3600,
        httponly=True,  # JavaScript cannot read it (protects against XSS theft)
        secure=settings.COOKIE_SECURE,  # HTTPS only, when enabled
        samesite="lax",  # not sent on cross-site POSTs (protects against CSRF)
        path=COOKIE_PATH,
    )


def _clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(settings.REFRESH_COOKIE_NAME, path=COOKIE_PATH)


def _revoke_family(db: Session, family_id: str) -> None:
    db.execute(
        update(RefreshToken)
        .where(RefreshToken.family_id == family_id, RefreshToken.revoked_at.is_(None))
        .values(revoked_at=utcnow())
    )


# ---------- endpoints ----------
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit("register", settings.RATE_LIMIT_REGISTER_PER_MIN, 60))],
)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    email = data.email.lower()

    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already registered")

    user = User(
        email=email,
        display_name=data.display_name.strip(),
        hashed_password=hash_password(data.password),
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        # Two signups with the same email at the same instant: the database's
        # unique constraint is the last line of defence.
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already registered")

    return user


@router.post(
    "/login",
    response_model=TokenResponse,
    dependencies=[Depends(rate_limit("login", settings.RATE_LIMIT_LOGIN_PER_MIN, 60))],
)
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == data.email.lower()))

    # Always run one password check, even if the user doesn't exist, so the
    # response time doesn't reveal whether the email is registered.
    password_ok = verify_password(data.password, user.hashed_password if user else DUMMY_HASH)

    now = utcnow()
    is_locked = user is not None and user.locked_until is not None and user.locked_until > now

    # Wrong password on a real, unlocked account: count it, lock after too many.
    if user and not is_locked and not password_ok:
        user.failed_login_attempts += 1
        if user.failed_login_attempts >= settings.MAX_FAILED_LOGINS:
            user.locked_until = now + timedelta(minutes=settings.LOCKOUT_MINUTES)
            user.failed_login_attempts = 0
        db.commit()

    # One vague message for every failure: wrong email, wrong password,
    # locked, disabled. While locked, even the CORRECT password is refused.
    if not user or is_locked or not password_ok or not user.is_active:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Successful login: forget past failures.
    if user.failed_login_attempts or user.locked_until:
        user.failed_login_attempts = 0
        user.locked_until = None

    # A new login starts a new "family" of refresh tokens.
    raw_refresh = _new_refresh_token(db, user.id, family_id=str(uuid.uuid4()))
    db.commit()
    _set_refresh_cookie(response, raw_refresh)

    return TokenResponse(access_token=create_access_token(user.id))


@router.post(
    "/refresh",
    response_model=TokenResponse,
    dependencies=[Depends(rate_limit("refresh", settings.RATE_LIMIT_REFRESH_PER_MIN, 60))],
)
def refresh(request: Request, response: Response, db: Session = Depends(get_db)):
    invalid = HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid refresh token")

    raw = request.cookies.get(settings.REFRESH_COOKIE_NAME)
    if not raw:
        raise invalid

    token = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == hash_token(raw)))
    if token is None:
        raise invalid

    # REUSE DETECTION: this token was already used (rotated) or revoked, yet
    # someone is presenting it again. Either the user or a thief has an old
    # copy. We can't tell which, so we kill the whole login (the family).
    if token.revoked_at is not None:
        _revoke_family(db, token.family_id)
        db.commit()
        raise invalid

    if token.expires_at < utcnow():
        raise invalid

    user = db.get(User, token.user_id)
    if user is None or not user.is_active:
        raise invalid

    # ROTATION: retire this token, issue a new one in the same family.
    token.revoked_at = utcnow()
    new_raw = _new_refresh_token(db, user.id, family_id=token.family_id)
    db.commit()
    _set_refresh_cookie(response, new_raw)

    return TokenResponse(access_token=create_access_token(user.id))


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    raw = request.cookies.get(settings.REFRESH_COOKIE_NAME)
    if raw:
        token = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == hash_token(raw)))
        if token:
            _revoke_family(db, token.family_id)
            db.commit()
    _clear_refresh_cookie(response)
    # Always 204, even if there was nothing to log out of.


@router.post("/logout-all", status_code=status.HTTP_204_NO_CONTENT)
def logout_all(
    response: Response,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.execute(
        update(RefreshToken)
        .where(RefreshToken.user_id == current_user.id, RefreshToken.revoked_at.is_(None))
        .values(revoked_at=utcnow())
    )
    db.commit()
    _clear_refresh_cookie(response)
