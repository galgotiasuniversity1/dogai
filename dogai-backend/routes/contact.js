const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.status(400).json({ success: false, message: 'Name, email, subject and message are required.' });

    await Contact.create({ name, email, phone, subject, message });

    res.status(201).json({ success: true, message: "Message received! We'll get back to you within 24 hours." });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ success: false, message: 'Could not send message. Please try again.' });
  }
});

module.exports = router;
