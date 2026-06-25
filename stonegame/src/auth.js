const BASE_URL = 'http://172.20.10.2:8000/';
const API_BASE = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

// 로그아웃
export function logout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('username');
  window.location.href = '/';
}

// access 토큰 만료 시 refresh로 재발급
async function refreshAccessToken() {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) return null;

  const res = await fetch(`${API_BASE}/api/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    logout();
    return null;
  }

  const data = await res.json();
  localStorage.setItem('access', data.access);
  return data.access;
}

// 인증이 필요한 요청용 fetch 래퍼
export async function authFetch(url, options = {}) {
  let access = localStorage.getItem('access');

  let res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${access}`,
    },
  });

  // access 토큰 만료(401)면 refresh 후 재시도
  if (res.status === 401) {
    access = await refreshAccessToken();
    if (!access) return res;

    res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${access}`,
      },
    });
  }

  return res;
}
