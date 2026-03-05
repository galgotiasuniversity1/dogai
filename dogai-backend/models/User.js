const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true, select: false, minlength: 6 },

  isVerified:         { type: Boolean, default: true }, // true for dev — set false for prod
  verificationToken:  String,
  verificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: { type: Date, default: Date.now }
});

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

// Generate verification token
userSchema.methods.getVerificationToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationToken  = crypto.createHash('sha256').update(token).digest('hex');
  this.verificationExpire = Date.now() + 24 * 60 * 60 * 1000;
  return token;
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken   = crypto.createHash('sha256').update(token).digest('hex');
  this.resetPasswordExpire  = Date.now() + 15 * 60 * 1000;
  return token;
};

module.exports = mongoose.model('User', userSchema);
