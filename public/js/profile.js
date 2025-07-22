// js/profile.js

window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert('Please log in first.');
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', logoutUser);
});

// Reuse logoutUser from auth.js
function logoutUser() {
  localStorage.removeItem('user');
  alert('Logged out successfully.');
  window.location.href = 'login.html';
}
