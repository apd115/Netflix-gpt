from typing import Literal

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query

from ..config import settings
from ..dependencies import get_current_user

# dependencies=[...] on the router means EVERY route below requires a logged-in
# user. Without it, anyone on the internet could spend our TMDB quota for free.
router = APIRouter(
    prefix="/movies",
    tags=["movies"],
    dependencies=[Depends(get_current_user)],
)

TMDB_BASE = "https://api.themoviedb.org/3"


def tmdb_get(path: str, params: dict | None = None) -> dict:
    """Call TMDB with our secret key and hand back its JSON.

    The browser never sees the key, and never talks to TMDB directly.
    """
    try:
        response = httpx.get(
            TMDB_BASE + path,
            params=params,
            headers={
                "Authorization": f"Bearer {settings.TMDB_API_KEY}",
                "accept": "application/json",
            },
            timeout=10,
        )
    except httpx.HTTPError:
        # Network failure / timeout / blocked. 502 = "our upstream failed".
        raise HTTPException(502, "Could not reach the movie service")

    if response.status_code != 200:
        # Don't forward TMDB's own error text; it could mention our key setup.
        raise HTTPException(502, "The movie service returned an error")
    return response.json()


# Order matters: "/search" must be declared before "/{category}", or FastAPI
# would try to treat the word "search" as a category.
@router.get("/search")
def search_movies(query: str = Query(min_length=1, max_length=100)):
    return tmdb_get(
        "/search/movie",
        {"query": query, "include_adult": "false", "language": "en-US", "page": 1},
    )


@router.get("/{movie_id}/videos")
def movie_videos(movie_id: int):  # int: anything that isn't a number gets a 422
    return tmdb_get(f"/movie/{movie_id}/videos", {"language": "en-US"})


# Literal[...] = only these four words are accepted; no one can make our server
# request arbitrary TMDB paths.
@router.get("/{category}")
def movie_list(category: Literal["now_playing", "popular", "top_rated", "upcoming"]):
    return tmdb_get(f"/movie/{category}", {"language": "en-US", "page": 1})
