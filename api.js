// ═══════════════════════════════════════════════════════════════════
// api.js — Backend API calls + Nav UI
// ═══════════════════════════════════════════════════════════════════

const API_BASE = 'http://localhost:5000/api';
// Change to your Render URL when deploying live:
// const API_BASE = 'https://dogai-backend.onrender.com/api';

// ── Token storage ─────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('dogai_token');
const getUser  = () => JSON.parse(localStorage.getItem('dogai_user') || 'null');
const setAuth  = (token, user) => {
  localStorage.setItem('dogai_token', token);
  localStorage.setItem('dogai_user', JSON.stringify(user));
};
const clearAuth = () => {
  localStorage.removeItem('dogai_token');
  localStorage.removeItem('dogai_user');
};

// ── Base API call ─────────────────────────────────────────────────────
async function apiCall(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  try {
    const res  = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await res.json();
    return { ok: res.ok, status: res.status, ...data };
  } catch (err) {
    console.error('API Error:', err);
    return { ok: false, message: 'Cannot connect to server. Is backend running on port 5000?' };
  }
}

// ── Auth functions (called from auth.js) ─────────────────────────────
async function signupUser(name, email, phone, password) {
  showLoadingBtn('signupBtn', 'Creating account...');
  const data = await apiCall('/auth/signup', 'POST', { name, email, phone, password });
  hideLoadingBtn('signupBtn', 'Create Account');
  if (data.success) {
    setAuth(data.token, data.user);
    updateNavUI(data.user);
    closeAuthModal();
    showToast('🎉 Welcome to DogAI, ' + data.user.name + '!');
  } else {
    showToast('❌ ' + data.message);
  }
}

async function loginUser(email, password) {
  showLoadingBtn('loginBtn', 'Signing in...');
  const data = await apiCall('/auth/login', 'POST', { email, password });
  hideLoadingBtn('loginBtn', 'Sign In');
  if (data.success) {
    setAuth(data.token, data.user);
    updateNavUI(data.user);
    closeAuthModal();
    showToast('🐾 Welcome back, ' + data.user.name + '!');
  } else {
    showToast('❌ ' + data.message);
  }
}

function logoutUser() {
  clearAuth();
  updateNavUI(null);
  showToast('👋 Logged out. See you soon!');
}

async function forgotPassword(email) {
  showLoadingBtn('forgotBtn', 'Sending...');
  const data = await apiCall('/auth/forgot-password', 'POST', { email });
  hideLoadingBtn('forgotBtn', 'Send Reset Link');
  showToast(data.success ? '📧 Reset link sent! Check your email.' : '❌ ' + data.message);
}

// ── Nav UI update ─────────────────────────────────────────────────────
function updateNavUI(user) {
  const signInBtn  = document.getElementById('signInBtn');
  const startBtn   = document.getElementById('getStartedBtn');
  if (user) {
    if (signInBtn) { signInBtn.textContent = '👤 ' + user.name.split(' ')[0]; signInBtn.onclick = () => window.location.href = 'profile.html'; }
    if (startBtn)  { startBtn.textContent = 'Logout 👋'; startBtn.onclick = logoutUser; }
  } else {
    if (signInBtn) { signInBtn.textContent = 'Sign In'; signInBtn.onclick = () => openAuthModal('login'); }
    if (startBtn)  { startBtn.textContent = 'Get Started ✨'; startBtn.onclick = () => openAuthModal('signup'); }
  }
}

// ── Button helpers ────────────────────────────────────────────────────
function showLoadingBtn(id, text) {
  const btn = document.getElementById(id);
  if (btn) { btn.disabled = true; btn.textContent = text; }
}
function hideLoadingBtn(id, text) {
  const btn = document.getElementById(id);
  if (btn) { btn.disabled = false; btn.textContent = text; }
}

// ── Restore nav on page load ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateNavUI(getToken() ? getUser() : null);
});
