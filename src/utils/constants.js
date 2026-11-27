// Served from the project's public/ folder: Vite serves anything in public/ at
// the site root, so public/logo.svg is available at /logo.svg.
export const LOGO = "/logo.svg";

export const MOVIE_IMG_CDN = "https://image.tmdb.org/t/p/w500";
export const BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg";

export const Lang_Identifier = [
  {
    identifier: "English",
    name: "English",
  },
  {
    identifier: "Hindi",
    name: "Hindi",
  },
  {
    identifier: "Spanish",
    name: "Spanish",
  }

]

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";

// Firebase gave every user this avatar; our backend does not store photos yet.
export const DEFAULT_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/9/9e/Male_Avatar.jpg";
