const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:id', productController.getProductById);

// Admin route (you can later secure this)
router.post('/', productController.createProduct);

module.exports = router;
