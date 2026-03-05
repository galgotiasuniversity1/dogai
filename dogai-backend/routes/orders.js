const express = require('express');
const router  = express.Router();
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order   = require('../models/Order');
const { optionalAuth } = require('../middleware/auth');
const { sendOrderConfirmation } = require('../middleware/emails/mailer');
const connectDB = require('../config/db');

function isTransientDbError(err) {
  if (!err) return false;
  const msg = (err.message || '').toLowerCase();
  const code = String(err.code || '');

  return (
    msg.includes('econnreset') ||
    msg.includes('timed out') ||
    msg.includes('connection') ||
    msg.includes('network') ||
    code === '6' ||
    code === '7' ||
    code === '89' ||
    code === '91' ||
    code === '189'
  );
}

async function createOrderWithRetry(payload, attempts = 4) {
  let lastErr;

  for (let i = 1; i <= attempts; i++) {
    try {
      return await Order.create(payload);
    } catch (err) {
      lastErr = err;
      if (!isTransientDbError(err) || i === attempts) break;

      console.warn(`⚠️ Order save transient DB error (attempt ${i}/${attempts}): ${err.message}`);

      try {
        if (typeof connectDB.reconnectDB === 'function') {
          await connectDB.reconnectDB();
        }
      } catch (reconnectErr) {
        console.error('⚠️ MongoDB reconnect attempt failed:', reconnectErr.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 500 * i));
    }
  }

  throw lastErr;
}

// POST /api/orders/create-payment-intent
router.post('/create-payment-intent', optionalAuth, async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ success: false, message: 'Invalid amount.' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // rupees -> paise
      currency,
      metadata: { platform: 'dogai.in' }
    });

    res.json({
      success: true,
      clientSecret:    paymentIntent.client_secret,
      publishableKey:  process.env.STRIPE_PUBLISHABLE_KEY
    });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ success: false, message: 'Payment initiation failed.' });
  }
});

// POST /api/orders/place
router.post('/place', optionalAuth, async (req, res) => {
  try {
    const {
      firstName, lastName = '', email = '', phone,
      address, city, state, pincode,
      items, paymentMethod = 'cod',
      stripePaymentIntentId = null
    } = req.body;

    // Debug log
    console.log('\n📦 Order received:');
    console.log('  Name:', firstName, lastName, '| Phone:', phone);
    console.log('  City:', city, '| State:', state, '| Pincode:', pincode);
    console.log('  Payment:', paymentMethod, '| StripeID:', stripePaymentIntentId);
    console.log('  Items count:', items?.length, '| First:', JSON.stringify(items?.[0]));

    // Validate required fields
    const missing = [];
    if (!firstName) missing.push('First Name');
    if (!phone)     missing.push('Phone');
    if (!address)   missing.push('Address');
    if (!city)      missing.push('City');
    if (!state)     missing.push('State');
    if (!pincode)   missing.push('Pincode');
    if (missing.length > 0)
      return res.status(400).json({ success: false, message: `Missing: ${missing.join(', ')}` });

    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: 'No items in order.' });

    // Verify Stripe payment
    let paymentStatus = 'pending';
    if (paymentMethod === 'card') {
      if (!stripePaymentIntentId)
        return res.status(400).json({ success: false, message: 'Missing Stripe payment ID.' });

      const pi = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
      console.log('  Stripe status:', pi.status);
      if (pi.status !== 'succeeded')
        return res.status(400).json({ success: false, message: 'Payment not completed on Stripe.' });

      paymentStatus = 'paid';
    }

    // Map cart items (frontend uses 'id', model uses 'itemId')
    const mappedItems = items.map(item => ({
      itemId: item.id    || item.itemId || 'unknown',
      name:   item.name  || 'Item',
      price:  Number(item.price) || 0,
      qty:    Number(item.qty)   || 1,
      icon:   item.icon  || '📦',
      type:   item.type  || 'product'
    }));

    const subtotal       = mappedItems.reduce((s, i) => s + i.price * i.qty, 0);
    const deliveryCharge = subtotal >= 999 ? 0 : 99;
    const totalAmount    = subtotal + deliveryCharge;

    const orderPayload = {
      user: req.user?._id || null,
      firstName, lastName, email: (email || req.user?.email || ''), phone,
      address, city, state, pincode,
      items: mappedItems,
      subtotal, deliveryCharge, totalAmount,
      paymentMethod, paymentStatus,
      stripePaymentIntentId,
      orderStatus: 'placed'
    };

    const order = await createOrderWithRetry(orderPayload, 4);

    console.log('  ✅ Order saved:', order.orderId);

    try {
      await sendOrderConfirmation(order);
    } catch (emailErr) {
      console.error('  ❌ Order email send failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: order.orderId,
      order: {
        orderId:       order.orderId,
        totalAmount:   order.totalAmount,
        paymentStatus: order.paymentStatus,
        orderStatus:   order.orderStatus
      }
    });
  } catch (err) {
    console.error('  ❌ Order save error:', err.message);
    const statusCode = isTransientDbError(err) ? 503 : 500;
    const message = isTransientDbError(err)
      ? 'Temporary database connection issue. Please retry in a few seconds.'
      : 'Order save failed: ' + err.message;
    res.status(statusCode).json({ success: false, message });
  }
});

// GET /api/orders/my-orders
router.get('/my-orders', optionalAuth, async (req, res) => {
  try {
    if (req.user?._id) {
      const orders = await Order.find({ $or: [{ user: req.user._id }, { email: req.user.email }] }).sort({ placedAt: -1 });
      return res.json({ success: true, orders });
    }

    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: 'Email required.' });
    const orders = await Order.find({ email }).sort({ placedAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;


