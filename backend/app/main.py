from contextlib import asynccontextmanager

from fastapi import FastAPI

from . import models  # noqa: F401  (importing registers the tables on Base)
from .database import Base, engine
from .routers import auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Netflix-GPT Auth API", lifespan=lifespan)
app.include_router(auth.router)


@app.get("/health")
def health():
    return {"status": "ok"}
