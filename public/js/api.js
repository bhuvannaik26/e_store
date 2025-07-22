// js/api.js
const API_BASE = 'http://localhost:5000/api';

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API Error');
  }
  return res.json();
}
