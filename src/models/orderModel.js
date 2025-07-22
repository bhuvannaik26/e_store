const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  totalAmount: Number,
  status: { type: String, default: 'Processing' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
