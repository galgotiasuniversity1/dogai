const mongoose = require('mongoose');

const mongooseOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4
};

let listenersAttached = false;
let connectPromise = null;

function attachConnectionListeners() {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on('disconnected', () => {
    console.error('❌ MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
}

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) return mongoose.connection;
    if (connectPromise) return connectPromise;

    connectPromise = mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    const conn = await connectPromise;
    attachConnectionListeners();
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  } finally {
    connectPromise = null;
  }
}

async function reconnectDB() {
  if (mongoose.connection.readyState === 1) return;
  console.warn('⚠️ Attempting MongoDB reconnect...');
  await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
}

module.exports = connectDB;
module.exports.reconnectDB = reconnectDB;
