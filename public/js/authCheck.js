// js/authCheck.js

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  // If user is missing entirely
  if (window.location.pathname.endsWith("register.html")) {
    // Allow access to register page
  } else if (window.location.pathname.endsWith("login.html")) {
    // Allow access to login page
  } else {
    // Redirect to register if nothing found
    window.location.href = 'register.html';
  }
} else {
  // User exists, but restrict access to login/register pages
  if (window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("register.html")) {
    window.location.href = 'index.html';
  }
}
