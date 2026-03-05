const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  itemId: { type: String, default: 'unknown' },
  name:   { type: String, required: true },
  price:  { type: Number, required: true },
  qty:    { type: Number, required: true, min: 1 },
  icon:   { type: String, default: '📦' },
  type:   { type: String, default: 'product' }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String, unique: true,
    default: () => 'DAI' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-3).toUpperCase()
  },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  firstName: { type: String, required: true },
  lastName:  { type: String, default: '' },
  email:     { type: String, default: '' },
  phone:     { type: String, required: true },
  address:   { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  pincode:   { type: String, required: true },
  items:     [orderItemSchema],
  subtotal:       { type: Number, required: true },
  deliveryCharge: { type: Number, default: 0 },
  totalAmount:    { type: Number, required: true },
  paymentMethod:  { type: String, enum: ['upi','card','cod'], default: 'cod' },
  paymentStatus:  { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
  stripePaymentIntentId: { type: String, default: null },
  orderStatus: {
    type: String,
    enum: ['placed','confirmed','processing','shipped','delivered','cancelled'],
    default: 'placed'
  },
  placedAt:  { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
