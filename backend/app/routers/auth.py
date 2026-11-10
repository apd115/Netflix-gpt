from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..models import User
from ..schemas import RegisterRequest, UserResponse
from ..security import hash_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
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
