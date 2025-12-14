export const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000/api';

const TOKEN_KEY = 'ssms_token';
const EMAIL_KEY = 'ssms_email';

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);
export const setAuthToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearAuthToken = () => localStorage.removeItem(TOKEN_KEY);

export const getStoredEmail = () => localStorage.getItem(EMAIL_KEY);
export const setStoredEmail = (email) => localStorage.setItem(EMAIL_KEY, email);
export const clearStoredEmail = () => localStorage.removeItem(EMAIL_KEY);

export const parseJwt = (token) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const request = async (path, { method = 'GET', body, auth = false } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
};

export const api = {
  auth: {
    login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
    register: (name, email, password) => request('/auth/register', { method: 'POST', body: { name, email, password } })
  },
  sweets: {
    list: () => request('/sweets', { auth: true }),
    search: (params) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/sweets/search${qs ? `?${qs}` : ''}`, { auth: true });
    },
    create: (sweet) => request('/sweets', { method: 'POST', body: sweet, auth: true }),
    update: (id, sweet) => request(`/sweets/${id}`, { method: 'PUT', body: sweet, auth: true }),
    remove: (id) => request(`/sweets/${id}`, { method: 'DELETE', auth: true }),
    purchase: (id) => request(`/sweets/${id}/purchase`, { method: 'POST', auth: true }),
    restock: (id, amount) => request(`/sweets/${id}/restock`, { method: 'POST', body: { amount }, auth: true })
  }
};
