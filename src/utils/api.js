// The ONE place in the app that talks to our FastAPI backend.
// Every other file calls apiFetch() instead of using fetch() directly, so the
// token handling and error handling are written once, not copied everywhere.

const API_URL = import.meta.env?.VITE_API_URL ?? "http://localhost:8002";

// ---------------------------------------------------------------------------
// 1. Where the access token lives: a plain variable, in JavaScript memory.
//    Not localStorage: any script injected into the page (XSS) could read that.
//    A page refresh wipes this variable, and that is fine, because the httpOnly
//    refresh cookie lets us get a new one (see refreshAccessToken below).
// ---------------------------------------------------------------------------
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

// ---------------------------------------------------------------------------
// 2. Errors: FastAPI sends {"detail": "..."} for our own errors, but
//    {"detail": [{"msg": "..."}, ...]} for validation errors (HTTP 422).
//    We turn both into one readable string the UI can show.
// ---------------------------------------------------------------------------
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const readError = async (res) => {
  try {
    const body = await res.json();
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail)) return body.detail.map((e) => e.msg).join(", ");
  } catch {
    // body was not JSON; fall through to the generic message
  }
  return "Something went wrong. Please try again.";
};

// ---------------------------------------------------------------------------
// 3. Getting a new access token from the refresh cookie.
//
//    SINGLE-FLIGHT: if a refresh is already running, everyone who asks gets the
//    SAME promise instead of starting another request. Why this matters: the
//    backend rotates the refresh token on every use. Two simultaneous refreshes
//    would send the same cookie twice; the second looks like a stolen, replayed
//    token, and the backend would revoke the whole session. React StrictMode
//    (dev) and several parallel requests expiring together can both cause this.
// ---------------------------------------------------------------------------
let refreshPromise = null;

export const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // lets the browser send/receive the cookie
    })
      .then(async (res) => {
        if (!res.ok) {
          accessToken = null;
          return null; // no valid session
        }
        const data = await res.json();
        accessToken = data.access_token;
        return accessToken;
      })
      .catch(() => null) // network error: treat as "no session" for now
      .finally(() => {
        refreshPromise = null; // allow a future refresh
      });
  }
  return refreshPromise;
};

// ---------------------------------------------------------------------------
// 4. The wrapper every API call goes through.
//    auth: true  -> attach "Authorization: Bearer <token>" and, if the server
//                   answers 401 (token expired), refresh once and retry once.
//    auth: false -> for login/register/logout, where a 401 means "wrong
//                   password", not "token expired", so we must NOT retry.
// ---------------------------------------------------------------------------
export const apiFetch = async (path, { method = "GET", body, auth = true } = {}) => {
  const send = () =>
    fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(auth && accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  let res = await send();

  if (res.status === 401 && auth) {
    const newToken = await refreshAccessToken();
    if (newToken) res = await send(); // retry exactly once with the new token
  }

  if (!res.ok) throw new ApiError(res.status, await readError(res));
  return res.status === 204 ? null : res.json(); // 204 = success, no body
};
