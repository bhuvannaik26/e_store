// js/auth.js
const API_BASE = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000/api/auth'
  : 'https://e-store-2a4a.onrender.com/api/auth';


// Register User
async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ Registration successful! Redirecting to login page...');
      window.location.href = 'login.html';
    } else {
      alert(data.message || '❌ Registration failed.');
      console.error('Registration Error:', data);
    }
  } catch (err) {
    alert('⚠️ Error during registration.');
    console.error(err);
  }
}

// Login User
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      alert('✅ Login successful! Redirecting to homepage...');
      window.location.href = 'index.html';
    } else {
      alert(data.message || '❌ Login failed.');
      console.error('Login Error:', data);
    }
  } catch (err) {
    alert('⚠️ Error during login.');
    console.error(err);
  }
}

// Logout User
function logoutUser() {
  localStorage.removeItem('user');
  alert('👋 Logged out successfully.');
  window.location.href = 'login.html';
}
