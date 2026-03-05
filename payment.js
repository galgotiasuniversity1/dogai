// ═══════════════════════════════════════════════════════════════════
// payment.js — Stripe Card Payment
// ═══════════════════════════════════════════════════════════════════

const STRIPE_PUB_KEY = 'pk_test_51T7OSbFnuV2j0wh037L9ZVTylimIXCZwo4GcgjsbUPimH64KnAGJ5pyQr1YSeNW6gbTiQkD4kSdVr6dIwxHNT8H600FZG0N3st';

let stripeInstance = null;
let cardElement    = null;
let cardMounted    = false;

function getStripe() {
  if (!stripeInstance) {
    if (typeof Stripe === 'undefined') {
      console.error('Stripe.js not loaded!');
      return null;
    }
    stripeInstance = Stripe(STRIPE_PUB_KEY);
  }
  return stripeInstance;
}

function initStripe() {
  const stripe    = getStripe();
  const container = document.getElementById('stripe-card-element');
  if (!stripe || !container || cardMounted) return;

  const elements = stripe.elements();
  cardElement = elements.create('card', {
    style: {
      base: {
        fontSize: '15px',
        fontFamily: '"DM Sans", Arial, sans-serif',
        color: '#1A1A1A',
        '::placeholder': { color: '#9CA3AF' },
        iconColor: '#E8A020',
      },
      invalid: { color: '#C4622D', iconColor: '#C4622D' }
    },
    hidePostalCode: true
  });

  cardElement.mount('#stripe-card-element');
  cardMounted = true;

  cardElement.on('change', (e) => {
    const err = document.getElementById('stripe-card-errors');
    if (err) err.textContent = e.error ? e.error.message : '';
  });
}

// Called from placeOrder() in script.js
// Returns: paymentIntentId string on success, null on failure
async function handleStripePayment(totalAmountRupees) {
  const stripe = getStripe();
  if (!stripe || !cardElement) {
    showToast('❌ Card not ready. Please select Card payment again.');
    return null;
  }

  const errEl = document.getElementById('stripe-card-errors');
  if (errEl) errEl.textContent = '';

  try {
    // Step 1 — create PaymentIntent on backend
    const data = await apiCall('/orders/create-payment-intent', 'POST', { amount: totalAmountRupees });
    if (!data.success || !data.clientSecret) {
      showToast('❌ Payment initiation failed. Check backend is running.');
      return null;
    }

    // Step 2 — confirm with Stripe
    const firstName = document.getElementById('firstName')?.value?.trim() || '';
    const lastName  = document.getElementById('lastName')?.value?.trim() || '';
    const email     = document.getElementById('checkoutEmail')?.value?.trim() || '';
    const phone     = document.getElementById('checkoutPhone')?.value?.trim() || '';

    const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name:  `${firstName} ${lastName}`.trim() || 'Customer',
          email: email  || undefined,
          phone: phone  || undefined,
        }
      }
    });

    if (error) {
      if (errEl) errEl.textContent = error.message;
      showToast('❌ ' + error.message);
      return null;
    }

    if (paymentIntent.status === 'succeeded') {
      return paymentIntent.id; // ✅ success
    }

    showToast('❌ Payment not completed: ' + paymentIntent.status);
    return null;

  } catch (err) {
    console.error('Stripe error:', err);
    showToast('❌ Payment error: ' + err.message);
    return null;
  }
}
