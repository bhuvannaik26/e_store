// models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  countInStock: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);
