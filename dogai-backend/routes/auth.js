const express = require('express');
const crypto  = require('crypto');
const router  = express.Router();
const User    = require('../models/User');
const { generateToken, protect } = require('../middleware/auth');
const { sendPasswordResetEmail } = require('../middleware/emails/mailer');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password)
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    if (password.length < 6)
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });

    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, message: 'Email already registered. Please log in.' });

    const user  = await User.create({ name, email, phone, password, isVerified: true });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created!',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required.' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });

    const token = generateToken(user._id);
    res.json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // Always return success to prevent email enumeration
    if (!user) return res.json({ success: true, message: 'If registered, a reset link has been sent.' });
    const resetToken = user.getResetPasswordToken();
    await user.save();
    try {
      await sendPasswordResetEmail(user, resetToken);
    } catch (emailErr) {
      console.error('Reset email send failed:', emailErr.message);
    }
    res.json({ success: true, message: 'Password reset link sent to your email.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    const user   = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired reset link.' });
    if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    user.password            = password;
    user.resetPasswordToken  = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.json({ success: true, message: 'Password reset successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

// PUT /api/auth/update-details
router.put('/update-details', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (req.body.name)     user.name  = req.body.name;
    if (req.body.phone)    user.phone = req.body.phone;
    if (req.body.password) user.password = req.body.password;
    const updated = await user.save();
    res.json({ success: true, user: { id: updated._id, name: updated.name, email: updated.email, phone: updated.phone } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
});

module.exports = router;

