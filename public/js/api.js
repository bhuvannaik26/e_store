// js/api.js
const API_BASE = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000/api'
  : 'https://e-store-2a4a.onrender.com/api';


async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API Error');
  }
  return res.json();
}
