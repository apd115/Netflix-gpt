import threading
import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request, status

# For each key (like "login:203.0.113.5") remember WHEN recent requests happened.
_hits: dict[str, deque[float]] = defaultdict(deque)
_lock = threading.Lock()  # FastAPI runs sync endpoints on several threads


def rate_limit(name: str, max_calls: int, per_seconds: int):
    """Build a dependency that allows `max_calls` per `per_seconds` per IP."""

    def dependency(request: Request) -> None:
        ip = request.client.host if request.client else "unknown"
        key = f"{name}:{ip}"
        now = time.monotonic()

        with _lock:
            hits = _hits[key]
            # Forget requests that fell out of the time window.
            while hits and hits[0] <= now - per_seconds:
                hits.popleft()

            if len(hits) >= max_calls:
                retry_after = int(per_seconds - (now - hits[0])) + 1
                raise HTTPException(
                    status.HTTP_429_TOO_MANY_REQUESTS,
                    "Too many requests. Try again later.",
                    headers={"Retry-After": str(retry_after)},
                )
            hits.append(now)

    return dependency
