const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// Get featured products (for homepage)
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(6);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching featured products' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// Admin: Create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image, isFeatured } = req.body;

    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({ name, price, description, image, isFeatured });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error creating product' });
  }
};
