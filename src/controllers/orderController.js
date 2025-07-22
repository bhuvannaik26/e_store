const Product = require('../models/productModel');
const Order = require('../models/orderModel');

const placeOrder = async (req, res) => {
  try {
    const { user, cartItems, shippingAddress } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No products in order.' });
    }

    // Fetch product details from DB
    const productIds = cartItems.map(item => item._id);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== cartItems.length) {
      return res.status(400).json({ message: 'Some products are invalid.' });
    }

    const products = cartItems.map(item => {
      const matched = dbProducts.find(p => p._id.toString() === item._id);
      return {
        product: matched._id,
        name: matched.name,
        price: matched.price,
        qty: item.qty,
      };
    });

    const totalAmount = products.reduce((sum, item) => sum + item.price * item.qty, 0);

    const order = new Order({
      user,
      products,
      shippingAddress,
      totalAmount,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
};


// Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user orders', error });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getUserOrders,
  cancelOrder,
};
