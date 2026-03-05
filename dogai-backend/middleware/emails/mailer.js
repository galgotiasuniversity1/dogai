const { MailtrapClient } = require('mailtrap');

const token = process.env.MAILTRAP_API_TOKEN || process.env.MAILTRAP_KEY;

const sender = {
  email: process.env.MAILTRAP_SENDER_EMAIL || process.env.EMAIL_USER || 'hello@demomailtrap.co',
  name: process.env.MAILTRAP_SENDER_NAME || 'DogAI.in'
};

const client = token ? new MailtrapClient({ token }) : null;
const frontendBaseUrl = (
  process.env.NODE_ENV === 'production'
    ? (process.env.FRONTEND_URL || 'https://www.dogai.in')
    : (process.env.FRONTEND_URL_LOCAL || 'http://localhost:5500')
).replace(/\/+$/, '');

if (client) {
  console.log(`📧 Mailtrap enabled: sender=${sender.email}`);
} else {
  console.log('📧 Mailtrap disabled — set MAILTRAP_API_TOKEN (or MAILTRAP_KEY) in .env');
}

function htmlToText(html) {
  return String(html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function sendMail(to, subject, html, category = 'DogAI Transactional') {
  if (!client || !to) return;

  await client.send({
    from: sender,
    to: [{ email: to }],
    subject,
    text: htmlToText(html),
    html,
    category
  });
}

// ── Order Confirmation ────────────────────────────────────────────────
exports.sendOrderConfirmation = async (order) => {
  if (!order.email) return;
  const itemsHtml = order.items.map(i =>
    `<tr><td style="padding:8px 0;">${i.icon} ${i.name} × ${i.qty}</td><td style="text-align:right;">₹${(i.price * i.qty).toLocaleString('en-IN')}</td></tr>`
  ).join('');

  await sendMail(order.email, `Order Confirmed! #${order.orderId} — DogAI.in`, `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;">
      <h2 style="color:#E8A020;">🐾 Order Confirmed!</h2>
      <p>Hi ${order.firstName}, your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> #${order.orderId}</p>
      <table width="100%" style="border-top:1px solid #eee;margin-top:16px;">${itemsHtml}</table>
      <hr style="margin:16px 0;">
      <p><strong>Total: ₹${order.totalAmount.toLocaleString('en-IN')}</strong> (${order.paymentMethod.toUpperCase()})</p>
      <p>Delivering to: ${order.address}, ${order.city}, ${order.state} - ${order.pincode}</p>
      <p style="color:#888;font-size:13px;margin-top:24px;">Questions? Email us at hello@dogai.in</p>
    </div>
  `, 'Order Confirmation');
};

// ── Verification Email ────────────────────────────────────────────────
exports.sendVerificationEmail = async (user, tokenValue) => {
  const url = `${frontendBaseUrl}/verify?token=${tokenValue}`;
  await sendMail(user.email, 'Verify Your DogAI Account', `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;">
      <h2 style="color:#E8A020;">🐾 Verify Your Email</h2>
      <p>Hi ${user.name}, click the button below to verify your account.</p>
      <a href="${url}" style="display:inline-block;padding:14px 28px;background:#E8A020;color:white;border-radius:8px;text-decoration:none;font-weight:700;margin:16px 0;">Verify Email</a>
      <p style="color:#888;font-size:13px;">Link expires in 24 hours.</p>
    </div>
  `, 'Email Verification');
};

// ── Password Reset Email ──────────────────────────────────────────────
exports.sendPasswordResetEmail = async (user, tokenValue) => {
  const url = `${frontendBaseUrl}/reset-password.html?token=${tokenValue}`;
  await sendMail(user.email, 'Reset Your DogAI Password', `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;">
      <h2 style="color:#E8A020;">🔑 Reset Your Password</h2>
      <p>Hi ${user.name}, click below to reset your password.</p>
      <a href="${url}" style="display:inline-block;padding:14px 28px;background:#E8A020;color:white;border-radius:8px;text-decoration:none;font-weight:700;margin:16px 0;">Reset Password</a>
      <p style="color:#888;font-size:13px;">Link expires in 15 minutes. If you didn't request this, ignore this email.</p>
    </div>
  `, 'Password Reset');
};

// ── Newsletter Thank You ──────────────────────────────────────────────
exports.sendNewsletterThankYou = async (email) => {
  await sendMail(email, 'Thanks for subscribing to DogAI!', `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;">
      <h2 style="color:#E8A020;">🎉 Welcome to DogAI Newsletter</h2>
      <p>Thanks for subscribing. You will now receive pet care tips, product drops, and exclusive offers.</p>
      <p style="color:#888;font-size:13px;">If this was not you, you can ignore this email.</p>
    </div>
  `, 'Newsletter Subscription');
};



