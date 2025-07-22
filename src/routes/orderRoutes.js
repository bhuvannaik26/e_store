const express = require('express');
const {
  placeOrder,
  getAllOrders,
  getUserOrders,
  cancelOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/',placeOrder); // Place new order
router.get('/', getAllOrders); // All orders (admin)
router.get('/:userId', getUserOrders); // Orders for a user
router.put('/cancel/:id', cancelOrder); // Cancel an order

module.exports = router;
