const envApiBase = (process.env.REACT_APP_API_BASE_URL || "").trim();
const browserProtocol = window.location.protocol === "https:" ? "https:" : "http:";
const browserHost = window.location.hostname || "127.0.0.1";
const inferredApiBase = `${browserProtocol}//${browserHost}:8000`;
const API_BASE = (envApiBase || inferredApiBase).replace(/\/$/, "");
const DEV_FALLBACK_BASES = [
  API_BASE,
  inferredApiBase,
  "http://127.0.0.1:8000",
  "http://localhost:8000",
];

function buildApiUrl(baseUrl, path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

function uniqueBaseUrls() {
  return [...new Set(DEV_FALLBACK_BASES.map(base => base.replace(/\/$/, "")))];
}

async function requestWithFallback(path, options = {}) {
  let lastError = null;

  for (const baseUrl of uniqueBaseUrls()) {
    try {
      return await fetch(buildApiUrl(baseUrl, path), options);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("request-failed");
}

export async function apiFetch(path, options = {}) {
  return requestWithFallback(path, options);
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
  window.location.href = "/";
}

async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const res = await requestWithFallback("/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    logout();
    return null;
  }

  const data = await res.json();
  localStorage.setItem("access", data.access);
  return data.access;
}

export async function authFetch(path, options = {}) {
  let access = localStorage.getItem("access");

  let res = await requestWithFallback(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access}`,
    },
  });

  if (res.status === 401) {
    access = await refreshAccessToken();
    if (!access) return res;

    res = await requestWithFallback(path, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${access}`,
      },
    });
  }

  return res;
}
