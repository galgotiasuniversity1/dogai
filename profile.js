function profileMsg(text, type = 'info') {
  const el = document.getElementById('settingsMsg');
  if (!el) return;
  el.textContent = text;
  el.style.color = type === 'error' ? '#b91c1c' : type === 'success' ? '#166534' : '#374151';
}

function renderOrderHistory(orders) {
  const list = document.getElementById('orderList');
  if (!list) return;

  if (!orders || orders.length === 0) {
    list.innerHTML = '<p style="color:var(--mid-gray);">No orders found yet.</p>';
    return;
  }

  list.innerHTML = orders.map((order) => `
    <div class="order-summary" style="margin-bottom:14px;">
      <div class="order-row"><span>Order ID</span><strong>#${order.orderId}</strong></div>
      <div class="order-row"><span>Total</span><strong>₹${Number(order.totalAmount || 0).toLocaleString('en-IN')}</strong></div>
      <div class="order-row"><span>Payment</span><strong>${String(order.paymentStatus || 'pending').toUpperCase()}</strong></div>
      <div class="order-row"><span>Status</span><strong>${String(order.orderStatus || 'placed').toUpperCase()}</strong></div>
      <div class="order-row"><span>Placed At</span><strong>${new Date(order.placedAt).toLocaleString()}</strong></div>
    </div>
  `).join('');
}

async function loadOrderHistory() {
  const user = getUser();
  if (!user) return;

  let data = await apiCall('/orders/my-orders');
  if (!data.success) {
    data = await apiCall(`/orders/my-orders?email=${encodeURIComponent(user.email)}`);
  }

  if (!data.success) {
    renderOrderHistory([]);
    return;
  }

  renderOrderHistory(data.orders || []);
}

async function saveSettings() {
  const name = document.getElementById('setNames')?.value?.trim() || '';
  const phone = document.getElementById('setPhones')?.value?.trim() || '';
  const password = document.getElementById('setPass')?.value?.trim() || '';

  if (!name || !phone) {
    profileMsg('Name and phone are required.', 'error');
    return;
  }

  const btn = document.getElementById('saveSettingsBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Saving...';
  }

  const payload = { name, phone };
  if (password) payload.password = password;

  const data = await apiCall('/auth/update-details', 'PUT', payload);

  if (btn) {
    btn.disabled = false;
    btn.textContent = 'Save Changes';
  }

  if (!data.success) {
    profileMsg(data.message || 'Update failed.', 'error');
    return;
  }

  localStorage.setItem('dogai_user', JSON.stringify(data.user));
  document.getElementById('profName').textContent = data.user.name;
  document.getElementById('profPhone').textContent = data.user.phone || 'N/A';
  document.getElementById('setPass').value = '';
  profileMsg('Account updated successfully.', 'success');
}

function switchProfileTab(tab, btn) {
  document.querySelectorAll('.p-section').forEach(s => s.style.display = 'none');
  document.getElementById('tab-' + tab).style.display = 'block';
  document.querySelectorAll('.p-nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (tab === 'orders') loadOrderHistory();
}

document.addEventListener('DOMContentLoaded', () => {
  const user = getUser();
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('profName').textContent = user.name;
  document.getElementById('profEmail').textContent = user.email;
  document.getElementById('profPhone').textContent = user.phone || 'N/A';

  document.getElementById('setNames').value = user.name || '';
  document.getElementById('setPhones').value = user.phone || '';
});
