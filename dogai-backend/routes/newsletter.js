const express = require('express');
const router = express.Router();
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { sendNewsletterThankYou } = require('../middleware/emails/mailer');

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed.' });
    }

    await NewsletterSubscriber.create({ email });

    try {
      await sendNewsletterThankYou(email);
    } catch (mailErr) {
      console.error('Newsletter thank-you email failed:', mailErr.message);
    }

    return res.status(201).json({ success: true, message: 'Subscribed successfully.' });
  } catch (err) {
    console.error('Newsletter subscribe error:', err.message);
    return res.status(500).json({ success: false, message: 'Subscription failed. Please try again.' });
  }
});

module.exports = router;
