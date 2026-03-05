const petsData = [

  { id: 'p1', name: 'Max', breed: 'Golden Retriever', type: 'dog', age: '8 weeks', gender: 'Male', price: 32000, icon: '🦮', badge: 'KCI Certified', badgeType: '' },

  { id: 'p2', name: 'Bella', breed: 'Labrador Retriever', type: 'dog', age: '10 weeks', gender: 'Female', price: 18000, icon: '🐕', badge: 'Vaccinated', badgeType: '' },

  { id: 'p3', name: 'Luna', breed: 'Persian Cat', type: 'cat', age: '12 weeks', gender: 'Female', price: 15000, icon: '🐱', badge: 'New', badgeType: 'new' },

  { id: 'p4', name: 'Charlie', breed: 'Beagle', type: 'dog', age: '9 weeks', gender: 'Male', price: 22000, icon: '🐶', badge: 'KCI Certified', badgeType: '' },

  { id: 'p6', name: 'Coco', breed: 'Siamese Cat', type: 'cat', age: '10 weeks', gender: 'Female', price: 20000, icon: '😺', badge: 'Vaccinated', badgeType: '' },

  { id: 'p7', name: 'Bruno', breed: 'German Shepherd', type: 'dog', age: '8 weeks', gender: 'Male', price: 28000, icon: '🐕‍🦺', badge: 'KCI Certified', badgeType: '' },

  { id: 'p8', name: 'Snowball', breed: 'Holland Lop Rabbit', type: 'rabbit', age: '3 months', gender: 'Female', price: 3500, icon: '🐇', badge: 'New', badgeType: 'new' },

  { id: 'p9', name: 'Nemo', breed: 'Clownfish', type: 'fish', age: 'Adult', gender: 'NA', price: 800, icon: '🐠', badge: 'Rare', badgeType: 'new' },

  { id: 'p10', name: 'Rocky', breed: 'Rottweiler', type: 'dog', age: '9 weeks', gender: 'Male', price: 35000, icon: '🦴', badge: 'KCI Certified', badgeType: '' },

  { id: 'p11', name: 'Whiskers', breed: 'Maine Coon', type: 'cat', age: '14 weeks', gender: 'Male', price: 45000, icon: '🐈', badge: 'Vaccinated', badgeType: '' },

];



const productsData = {

  food: [

    { id: 'f1', name: "Royal Canin Adult Dog Food 4kg", cat: "Dog Food", icon: "🥩", price: 2199, mrp: 2599, rating: 5, reviews: 842 },

    { id: 'f2', name: "Whiskas Adult Cat Food — Ocean Fish 3kg", cat: "Cat Food", icon: "🐟", price: 1299, mrp: 1499, rating: 5, reviews: 631 },

    { id: 'f3', name: "Pedigree Puppy Starter Milk 400g", cat: "Puppy", icon: "🍼", price: 349, mrp: 429, rating: 4, reviews: 210 },

    { id: 'f4', name: "Drools Optimum Performance Dog Food 3kg", cat: "Dog Food", icon: "🦴", price: 899, mrp: 1099, rating: 4, reviews: 415 },

  ],

  toys: [

    { id: 't1', name: "Indestructible Chew Rope Set — 3 Pack", cat: "Chew Toys", icon: "🧶", price: 499, mrp: 699, rating: 5, reviews: 320 },

    { id: 't2', name: "Interactive Puzzle Feeder Ball", cat: "Interactive", icon: "⚽", price: 799, mrp: 999, rating: 4, reviews: 188 },

    { id: 't3', name: "Cat Tunnel & Crinkle Ball Combo", cat: "Cat Toy", icon: "🐱", price: 649, mrp: 849, rating: 5, reviews: 247 },

    { id: 't4', name: "Squeaky Plush Duck Toy — Large", cat: "Plush", icon: "🦆", price: 399, mrp: 499, rating: 4, reviews: 162 },

  ],

  accessories: [

    { id: 'a1', name: "Premium Leather Dog Collar with Name Tag", cat: "Collar", icon: "🎀", price: 699, mrp: 899, rating: 5, reviews: 534 },

    { id: 'a2', name: "Adjustable Harness — No-Pull Design", cat: "Harness", icon: "🦺", price: 1299, mrp: 1599, rating: 5, reviews: 291 },

    { id: 'a3', name: "Cozy Orthopedic Pet Bed — Large", cat: "Bedding", icon: "🛏️", price: 2499, mrp: 3199, rating: 4, reviews: 178 },

    { id: 'a4', name: "Stainless Steel Auto Water Bowl 1.5L", cat: "Bowl", icon: "🥣", price: 599, mrp: 799, rating: 5, reviews: 423 },

  ],

  grooming: [

    { id: 'g1', name: "Self-Cleaning Slicker Brush for Dogs", cat: "Brush", icon: "✂️", price: 599, mrp: 799, rating: 5, reviews: 667 },

    { id: 'g2', name: "Neem & Aloe Vera Pet Shampoo 500ml", cat: "Shampoo", icon: "🧴", price: 349, mrp: 449, rating: 4, reviews: 312 },

    { id: 'g3', name: "Professional Nail Clipper with Safety Guard", cat: "Nail Care", icon: "💅", price: 449, mrp: 599, rating: 5, reviews: 241 },

    { id: 'g4', name: "Dental Care Kit — Toothbrush + Toothpaste", cat: "Dental", icon: "🦷", price: 299, mrp: 399, rating: 4, reviews: 189 },

  ]

};




const petImageMap = {
  p1: 'https://source.unsplash.com/900x700/?golden,retriever,puppy',
  p2: 'https://source.unsplash.com/900x700/?labrador,retriever,puppy',
  p3: 'https://source.unsplash.com/900x700/?persian,cat',
  p4: 'https://source.unsplash.com/900x700/?beagle,dog',
  p6: 'https://source.unsplash.com/900x700/?siamese,cat',
  p7: 'https://source.unsplash.com/900x700/?german,shepherd,dog',
  p8: 'https://source.unsplash.com/900x700/?holland,lop,rabbit',
  p9: 'https://source.unsplash.com/900x700/?clownfish,aquarium',
  p10: 'https://source.unsplash.com/900x700/?rottweiler,dog',
  p11: 'https://source.unsplash.com/900x700/?maine,coon,cat'
};

const productImageMap = {
  f1: 'https://source.unsplash.com/900x700/?dog,food,bag',
  f2: 'https://source.unsplash.com/900x700/?cat,food,pack',
  f3: 'https://source.unsplash.com/900x700/?puppy,milk,pet',
  f4: 'https://source.unsplash.com/900x700/?dog,kibble,food',
  t1: 'https://source.unsplash.com/900x700/?dog,rope,toy',
  t2: 'https://source.unsplash.com/900x700/?pet,puzzle,toy',
  t3: 'https://source.unsplash.com/900x700/?cat,toy,tunnel',
  t4: 'https://source.unsplash.com/900x700/?dog,plush,toy',
  a1: 'https://source.unsplash.com/900x700/?dog,collar,leather',
  a2: 'https://source.unsplash.com/900x700/?dog,harness',
  a3: 'https://source.unsplash.com/900x700/?pet,bed',
  a4: 'https://source.unsplash.com/900x700/?pet,water,bowl',
  g1: 'https://source.unsplash.com/900x700/?pet,grooming,brush',
  g2: 'https://source.unsplash.com/900x700/?pet,shampoo',
  g3: 'https://source.unsplash.com/900x700/?pet,nail,clipper',
  g4: 'https://source.unsplash.com/900x700/?dog,dental,care'
};
const testimonials = [

  { name: "Priya S.", loc: "Mumbai", text: "Got my Golden Retriever puppy from DogAI and the experience was seamless. The breeder was KCI verified and the pup arrived healthy with all vaccination records. 10/10!", stars: 5, avatar: "P" },

  { name: "Rahul M.", loc: "Bangalore", text: "Ordered Royal Canin food and a premium collar for my Lab. Next-day delivery and the packaging was absolutely perfect. My dog loves the new toys too!", stars: 5, avatar: "R" },

  { name: "Sneha K.", loc: "Delhi", text: "The vet consultation feature is a lifesaver. My cat was unwell at midnight and within 5 minutes I had a vet on call giving expert advice. Truly 24/7!", stars: 5, avatar: "S" },

  { name: "Vikram T.", loc: "Chennai", text: "Adopted a beautiful Persian cat through DogAI. The whole process — from finding the right breed to home delivery — was handled so professionally.", stars: 5, avatar: "V" },

  { name: "Ananya P.", loc: "Hyderabad", text: "The pet food range is incredible. Found everything from puppy starter food to senior dog nutrition. Prices are better than any local pet store.", stars: 4, avatar: "A" },

  { name: "Karan J.", loc: "Pune", text: "Bought an interactive puzzle feeder for my Beagle and he's obsessed with it! Great quality products and super-fast delivery. Will definitely order again.", stars: 5, avatar: "K" },

];



// ─── STATE ────────────────────────────────────────────────────────────

let cart = [];

let selectedPayment = 'upi';




// ─── RENDER FUNCTIONS ─────────────────────────────────────────────────

function renderPets(filter = 'all') {

  const grid = document.getElementById('petsGrid');

  const filtered = filter === 'all' ? petsData : petsData.filter(p => p.type === filter);

  grid.innerHTML = filtered.map(pet => `

    <div class="pet-card three-d-card">

      <div class="pet-card-img">

        ${pet.badge ? `<span class="pet-badge ${pet.badgeType}">${pet.badge}</span>` : ''}

        <button class="wishlist-btn" onclick="wishlist('${pet.name}')">🤍</button>

        <img class="pet-photo" src="${petImageMap[pet.id] || ''}" alt="${pet.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><span class="pet-emoji-fallback">${pet.icon}</span>

      </div>

      <div class="pet-card-body">

        <div class="pet-breed">${pet.breed}</div>

        <div class="pet-name">${pet.name}</div>

        <div class="pet-meta">

          <span class="meta-item">📅 ${pet.age}</span>

          <span class="meta-item">⚥ ${pet.gender}</span>

        </div>

        <div class="pet-card-footer">

          <div class="pet-price-display">₹${pet.price.toLocaleString('en-IN')}</div>

          <button class="add-cart-btn" onclick="addToCart('${pet.id}', '${pet.name}', ${pet.price}, '${pet.icon}', 'pet')">Add to Cart</button>

        </div>

      </div>

    </div>

  `).join('');

}



function renderProducts(tab = 'food') {

  const grid = document.getElementById('productsGrid');

  const items = productsData[tab] || [];

  grid.innerHTML = items.map(item => `

    <div class="product-card three-d-card">

      <div class="product-img"><img class="product-photo" src="${productImageMap[item.id] || ''}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><span class="product-emoji-fallback">${item.icon}</span></div>

      <div class="product-body">

        <div class="product-cat">${item.cat}</div>

        <div class="product-name">${item.name}</div>

        <div class="product-rating">

          ${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}

          <span class="rating-count">(${item.reviews})</span>

        </div>

        <div class="product-footer">

          <div class="product-price">

            ₹${item.price.toLocaleString('en-IN')}

            <small>₹${item.mrp.toLocaleString('en-IN')}</small>

          </div>

          <button class="add-btn-sm" onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.icon}', 'product')">+</button>

        </div>

      </div>

    </div>

  `).join('');

}



function renderTestimonials() {

  document.getElementById('testimonialGrid').innerHTML = testimonials.map(t => `

    <div class="testimonial-card">

      <div class="test-stars">${'★'.repeat(t.stars).split('').map(s => `<span class="star">${s}</span>`).join('')}</div>

      <p class="test-text">"${t.text}"</p>

      <div class="test-author">

        <div class="author-avatar">${t.avatar}</div>

        <div>

          <div class="author-name">${t.name}</div>

          <div class="author-loc">📍 ${t.loc}</div>

        </div>

      </div>

    </div>

  `).join('');

}



// ─── CART FUNCTIONS ───────────────────────────────────────────────────

function addToCart(id, name, price, icon, type) {

  const existing = cart.find(i => i.id === id);

  if (existing) {

    existing.qty++;

  } else {

    cart.push({ id, name, price, icon, type, qty: 1 });

  }

  updateCartUI();

  showToast(`🛒 ${name} added to cart!`);

}



function removeFromCart(id) {

  cart = cart.filter(i => i.id !== id);

  updateCartUI();

  renderCartItems();

}



function updateQty(id, delta) {

  const item = cart.find(i => i.id === id);

  if (item) {

    item.qty += delta;

    if (item.qty <= 0) removeFromCart(id);

    else { updateCartUI(); renderCartItems(); }

  }

}



function updateCartUI() {

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const count = cart.reduce((s, i) => s + i.qty, 0);



  const badge = document.getElementById('cartBadge');

  badge.textContent = count;

  badge.classList.toggle('visible', count > 0);



  document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString('en-IN');

  document.getElementById('cartFooter').style.display = count > 0 ? 'block' : 'none';

}



function renderCartItems() {

  const el = document.getElementById('cartItems');

  if (cart.length === 0) {

    el.innerHTML = `<div class="cart-empty"><span class="empty-icon">🛒</span><p style="font-weight:600;font-size:16px;color:var(--charcoal);margin-bottom:8px;">Your cart is empty</p><p style="font-size:14px;">Add some amazing pets and products!</p></div>`;

    return;

  }

  el.innerHTML = cart.map(item => `

    <div class="cart-item">

      <div class="cart-item-img">${item.icon}</div>

      <div class="cart-item-info">

        <div class="cart-item-name">${item.name}</div>

        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>

        <div class="qty-controls">

          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>

          <span class="qty-num">${item.qty}</span>

          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>

        </div>

      </div>

      <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑</button>

    </div>

  `).join('');

}



function openCart() {

  renderCartItems();

  document.getElementById('cartPanel').classList.add('open');

  document.getElementById('overlay').classList.add('active');

}



function closeCart() {

  document.getElementById('cartPanel').classList.remove('open');

  document.getElementById('overlay').classList.remove('active');

}



// ─── CHECKOUT ─────────────────────────────────────────────────────────

function openCheckout() {

  if (cart.length === 0) { showToast('🛒 Your cart is empty!'); return; }

  closeCart();

  renderOrderSummary();

  document.getElementById('orderModal').classList.add('active');

}



function closeCheckout() {

  document.getElementById('orderModal').classList.remove('active');

}



function renderOrderSummary() {

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const delivery = subtotal >= 999 ? 0 : 99;

  const total = subtotal + delivery;

  document.getElementById('orderSummaryBox').innerHTML = `

    <h4>Order Summary (${cart.reduce((s, i) => s + i.qty, 0)} items)</h4>

    ${cart.map(i => `<div class="order-row"><span>${i.icon} ${i.name} × ${i.qty}</span><span>₹${(i.price * i.qty).toLocaleString('en-IN')}</span></div>`).join('')}

    <div class="order-row"><span>Delivery</span><span>${delivery === 0 ? '🎉 FREE' : '₹' + delivery}</span></div>

    <div class="order-row total"><span>Total Payable</span><span>₹${total.toLocaleString('en-IN')}</span></div>

  `;

}



function selectPayment(el, method) {
  selectedPayment = method;

  // Highlight selected payment option
  document.querySelectorAll('.payment-option').forEach(e => e.style.borderColor = 'var(--light-gray)');
  el.style.borderColor = 'var(--amber)';

  // Show Stripe card input only when Card is selected
  const cardWrapper = document.getElementById('stripe-card-wrapper');
  if (method === 'card') {
    if (cardWrapper) cardWrapper.style.display = 'block';
    // Mount Stripe card element
    if (typeof initStripe === 'function') initStripe();
    const btn = document.getElementById('placeOrderBtn');
    if (btn) btn.textContent = '💳 Pay & Place Order';
  } else {
    if (cardWrapper) cardWrapper.style.display = 'none';
    const btn = document.getElementById('placeOrderBtn');
    if (btn) btn.textContent = '🐾 Place Order Securely';
  }
}



async function placeOrder() {
  // ── Collect ALL form fields ──────────────────────────────────────
  const firstName = document.getElementById('firstName')?.value?.trim() || '';
  const lastName = document.getElementById('lastName')?.value?.trim() || '';
  const phone = document.getElementById('phone')?.value?.trim() || '';
  const email = document.getElementById('email')?.value?.trim() || getUser()?.email || '';
  const address = document.getElementById('address')?.value?.trim() || '';
  const city = document.getElementById('city')?.value?.trim() || '';
  const pincode = document.getElementById('pincode')?.value?.trim() || '';
  const state = document.getElementById('state')?.value || '';

  // ── Validate before doing anything ──────────────────────────────
  if (!firstName || !phone || !address || !city || !pincode || !state) {
    showToast('⚠️ Please fill all delivery fields!');
    return;
  }
  if (phone.replace(/\D/g, '').length < 10) {
    showToast('⚠️ Enter a valid 10-digit phone number!');
    return;
  }
  if (pincode.length !== 6 || isNaN(pincode)) {
    showToast('⚠️ Enter a valid 6-digit pincode!');
    return;
  }
  if (cart.length === 0) {
    showToast('🛒 Your cart is empty!');
    return;
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 999 ? 0 : 99;
  const finalAmount = subtotal + delivery;

  const btn = document.getElementById('placeOrderBtn');

  // ── Build order payload ──────────────────────────────────────────
  const orderData = {
    firstName, lastName, email, phone,
    address, city, pincode, state,
    paymentMethod: selectedPayment
  };

  // ── COD ──────────────────────────────────────────────────────────
  if (selectedPayment === 'cod') {
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Placing order...'; }
    await placeOrderDirect({ ...orderData, paymentStatus: 'pending' });
    if (btn) { btn.disabled = false; btn.textContent = '🐾 Place Order Securely'; }

    // ── Stripe Card ──────────────────────────────────────────────────
  } else if (selectedPayment === 'card') {
    if (btn) { btn.disabled = true; btn.textContent = '💳 Processing payment...'; }
    const stripePaymentIntentId = await handleStripePayment(finalAmount);
    if (btn) { btn.disabled = false; btn.textContent = '🐾 Place Order Securely'; }
    if (!stripePaymentIntentId) return; // Stripe error already shown
    await placeOrderDirect({ ...orderData, stripePaymentIntentId, paymentStatus: 'paid' });

    // ── UPI ──────────────────────────────────────────────────────────
  } else {
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Placing order...'; }
    await placeOrderDirect({ ...orderData, paymentStatus: 'pending' });
    if (btn) { btn.disabled = false; btn.textContent = '🐾 Place Order Securely'; }
  }
}


function closeSuccess() {

  document.getElementById('successModal').classList.remove('active');

}

// ─── BACKEND ORDER FUNCTIONS ──────────────────────────────────────────

async function placeOrderDirect(orderData) {
  const data = await apiCall('/orders/place', 'POST', {
    ...orderData,
    items: cart
  });

  if (data.success) {
    closeCheckout();
    cart = [];
    updateCartUI();
    showSuccessModal(data.orderId);
  } else {
    showToast('❌ ' + (data.message || 'Order failed. Please try again.'));
  }
}

function showSuccessModal(orderId) {
  const el = document.getElementById('orderId');
  if (el) el.textContent = 'Order ID: #' + orderId;
  setTimeout(() => {
    document.getElementById('successModal').classList.add('active');
  }, 300);
}



// ─── FILTER/TAB FUNCTIONS ─────────────────────────────────────────────

function filterPets(type, btn) {

  if (btn) {

    document.querySelectorAll('#petFilters .filter-btn').forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

  }

  renderPets(type);

  if (type !== 'all') document.getElementById('pets').scrollIntoView({ behavior: 'smooth' });

}



function switchTab(tab, btn) {

  if (btn) {

    document.querySelectorAll('#productTabs .tab-btn').forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

  } else {

    // Called without btn (from links)

    document.querySelectorAll('#productTabs .tab-btn').forEach((b, i) => {

      const tabs = ['food', 'toys', 'accessories', 'grooming'];

      b.classList.toggle('active', tabs[i] === tab);

    });

  }

  renderProducts(tab);

  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

}



// ─── UTILITIES ────────────────────────────────────────────────────────

function wishlist(name) {

  showToast(`❤️ ${name} added to wishlist!`);

}



function showToast(msg) {

  const toast = document.getElementById('toast');

  document.getElementById('toastMsg').textContent = msg;

  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 3000);

}



async function subscribeNewsletter() {

  const email = document.getElementById('newsletterEmail').value.trim();

  if (!email || !email.includes('@')) { showToast('⚠️ Enter a valid email!'); return; }

  const data = await apiCall('/newsletter/subscribe', 'POST', { email });
  if (data.success) {
    showToast('🎉 Subscribed! Check your email for confirmation.');
    document.getElementById('newsletterEmail').value = '';
  } else {
    showToast('❌ ' + (data.message || 'Subscription failed.'));
  }

}



// Navbar scroll effect

window.addEventListener('scroll', () => {

  const nav = document.getElementById('navbar');

  nav.style.boxShadow = window.scrollY > 40 ? '0 4px 24px rgba(0,0,0,0.1)' : 'none';

});







function openConsultationOptions() {
  const modal = document.getElementById('consultationModal');
  if (modal) modal.classList.add('active');
}

function closeConsultationOptions() {
  const modal = document.getElementById('consultationModal');
  if (modal) modal.classList.remove('active');
}

function bookPaidConsultation() {
  closeConsultationOptions();

  const consultationId = 'svc-vet-consult';
  const existing = cart.find((i) => i.id === consultationId);
  if (existing) {
    existing.qty = 1;
  } else {
    cart.push({
      id: consultationId,
      name: 'Vet Video Consultation',
      price: 299,
      icon: '🩺',
      type: 'service',
      qty: 1
    });
  }

  updateCartUI();
  openCheckout();

  setTimeout(() => {
    const cardOption = Array.from(document.querySelectorAll('.payment-option'))
      .find((el) => (el.getAttribute('onclick') || '').includes("'card'"));
    if (cardOption) {
      const radio = cardOption.querySelector("input[value='card']");
      if (radio) radio.checked = true;
      selectPayment(cardOption, 'card');
    }
  }, 120);
}

function startVideoConsultation() {
  closeConsultationOptions();
  const room = `dogai-vet-${Date.now()}`;
  const url = `https://meet.jit.si/${room}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
}
// ─── VET CHAT ────────────────────────────────────────────────────────
const vetQuickPrompts = [
  'My dog is not eating well',
  'Cat vomiting since morning',
  'Puppy vaccination schedule',
  'Skin itching and scratching'
];

function addVetMessage(text, role = 'bot') {
  const list = document.getElementById('vetChatMessages');
  if (!list) return;
  const div = document.createElement('div');
  div.className = `vet-msg ${role}`;
  div.textContent = text;
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
}

function buildVetQuickReplies() {
  const quick = document.getElementById('vetQuickReplies');
  if (!quick) return;
  quick.innerHTML = vetQuickPrompts
    .map((q) => `<button class="vet-quick-btn" onclick="sendVetPreset('${q.replace(/'/g, "\\'")}')">${q}</button>`)
    .join('');
}

function vetReplyFor(message) {
  const text = (message || '').toLowerCase();

  if (text.includes('not eating') || text.includes('appetite') || text.includes('food')) {
    return 'Try bland food and fresh water for now, avoid treats, and track appetite over the next 6-8 hours. If weakness or repeated vomiting appears, book a priority consultation.';
  }
  if (text.includes('vomit') || text.includes('vomiting') || text.includes('loose motion') || text.includes('diarrhea')) {
    return 'Keep your pet hydrated with small frequent sips, pause heavy meals for a few hours, and monitor stool/vomit frequency. If symptoms repeat more than 2-3 times, please schedule urgent follow-up.';
  }
  if (text.includes('skin') || text.includes('itch') || text.includes('scratch') || text.includes('allergy')) {
    return 'This can be due to allergy, fleas, or dryness. Use a mild pet-safe shampoo, avoid new foods for 48 hours, and check for redness near ears, paws, and belly.';
  }
  if (text.includes('vaccine') || text.includes('vaccination')) {
    return 'For puppies/kittens, core vaccines usually begin at 6-8 weeks with boosters every 3-4 weeks till around 16 weeks. Share age and breed and I will suggest a cleaner schedule.';
  }
  if (text.includes('fever') || text.includes('temperature') || text.includes('lethargic')) {
    return 'Please keep your pet in a cool, quiet area, provide water, and avoid self-medicating. If lethargy continues beyond a few hours, move to immediate consult.';
  }

  return 'Thanks for sharing. Please tell me your pet type, age, and key symptoms (since when), and I will guide you with next care steps.';
}

function sendVetPreset(text) {
  const input = document.getElementById('vetChatInput');
  if (input) input.value = text;
  const fakeEvent = { preventDefault: () => {} };
  sendVetMessage(fakeEvent);
}

function openVetChat(initialMessage = '') {
  const modal = document.getElementById('vetChatModal');
  if (!modal) return;

  modal.classList.add('active');
  buildVetQuickReplies();

  const list = document.getElementById('vetChatMessages');
  if (list && !list.dataset.booted) {
    addVetMessage('Hi! I am your Vet Care Assistant. Share your pet concern and I will help with immediate care steps.');
    addVetMessage('For better guidance, include pet type, age, weight, and symptoms.');
    list.dataset.booted = 'true';
  }

  if (initialMessage) {
    sendVetPreset(initialMessage);
  }

  const input = document.getElementById('vetChatInput');
  if (input) input.focus();
}

function closeVetChat() {
  const modal = document.getElementById('vetChatModal');
  if (modal) modal.classList.remove('active');
}

function sendVetMessage(event) {
  if (event && typeof event.preventDefault === 'function') event.preventDefault();

  const input = document.getElementById('vetChatInput');
  if (!input) return;

  const message = input.value.trim();
  if (!message) return;

  addVetMessage(message, 'user');
  input.value = '';

  const response = vetReplyFor(message);
  setTimeout(() => addVetMessage(response, 'bot'), 500);
}
// ─── INIT ─────────────────────────────────────────────────────────────

renderPets('all');

renderProducts('food');

renderTestimonials();







