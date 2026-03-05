// ═══════════════════════════════════════════════════════════════════
// auth.js — Auth Modal UI (login, signup, forgot password)
// ═══════════════════════════════════════════════════════════════════

function openAuthModal(mode = 'login') {
  const user = getUser();
  if (user && getToken()) {
    window.location.href = 'profile.html';
    return;
  }
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('active');
  toggleAuth(mode);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('active');
}

function toggleAuth(mode) {
  const loginForm  = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const forgotForm = document.getElementById('forgotForm');
  if (loginForm)  loginForm.style.display  = mode === 'login'  ? 'block' : 'none';
  if (signupForm) signupForm.style.display = mode === 'signup' ? 'block' : 'none';
  if (forgotForm) forgotForm.style.display = mode === 'forgot' ? 'block' : 'none';
}

async function handleLogin() {
  const email    = document.getElementById('loginEmail')?.value?.trim();
  const password = document.getElementById('loginPass')?.value;
  if (!email || !password) return showToast('⚠️ Email and password required.');
  await loginUser(email, password);
}

async function handleSignup() {
  const name     = document.getElementById('regName')?.value?.trim();
  const email    = document.getElementById('regEmail')?.value?.trim();
  const phone    = document.getElementById('regPhone')?.value?.trim();
  const password = document.getElementById('regPass')?.value;
  if (!name || !email || !phone || !password) return showToast('⚠️ All fields are required.');
  if (phone.length !== 10 || isNaN(phone)) return showToast('⚠️ Enter a valid 10-digit phone number.');
  if (password.length < 6) return showToast('⚠️ Password must be at least 6 characters.');
  await signupUser(name, email, phone, password);
}

async function handleForgot() {
  const email = document.getElementById('forgotEmail')?.value?.trim();
  if (!email) return showToast('⚠️ Please enter your email.');
  await forgotPassword(email);
}
