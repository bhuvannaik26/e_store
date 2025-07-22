// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // You'll create this file too

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // attach user to req
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
