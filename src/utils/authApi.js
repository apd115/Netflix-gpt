// The auth actions the UI needs. Same job the Firebase functions used to do:
//   createUserWithEmailAndPassword -> registerUser
//   signInWithEmailAndPassword     -> loginUser
//   signOut                        -> logoutUser
//   onAuthStateChanged             -> restoreSession
import { apiFetch, setAccessToken } from "./api";
import { DEFAULT_AVATAR } from "./constants";

// Our backend says {id, display_name}; the rest of the app (Redux, Header)
// expects Firebase's old shape {uid, displayName, photoURL}. We translate in
// ONE place so no other component has to change.
const toUser = (u) => ({
  uid: u.id,
  email: u.email,
  displayName: u.display_name,
  photoURL: DEFAULT_AVATAR,
});

export const loginUser = async ({ email, password }) => {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    auth: false,
    body: { email, password },
  });
  setAccessToken(data.access_token);
  return toUser(await apiFetch("/users/me"));
};

export const registerUser = async ({ name, email, password }) => {
  await apiFetch("/auth/register", {
    method: "POST",
    auth: false,
    body: { display_name: name, email, password },
  });
  // Firebase signed you in automatically after sign-up, so we do the same.
  return loginUser({ email, password });
};

export const logoutUser = async () => {
  try {
    await apiFetch("/auth/logout", { method: "POST", auth: false });
  } finally {
    setAccessToken(null); // forget the token locally even if the call failed
  }
};

// Called when the app starts (or a page refreshes): "is someone logged in?"
// Returns the user, or null.
//
// Single-flight again: if two callers ask at the same moment (StrictMode runs
// effects twice in development), they share one request instead of two.
let restorePromise = null;

export const restoreSession = () => {
  if (!restorePromise) {
    restorePromise = apiFetch("/users/me") // apiFetch refreshes through the cookie on a 401
      .then(toUser)
      .catch(() => null)
      .finally(() => {
        restorePromise = null;
      });
  }
  return restorePromise;
};
