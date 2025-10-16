// Auth page functionality (login/register toggle)
function showRegister() {
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  if (loginBox) loginBox.style.display = 'none';
  if (registerBox) registerBox.style.display = 'block';
}

function showLogin() {
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  if (registerBox) registerBox.style.display = 'none';
  if (loginBox) loginBox.style.display = 'block';
}

