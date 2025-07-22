const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// 🔐 Protected Route
router.get('/profile', protect, async (req, res) => {
  res.json(req.user); // user attached from middleware
});

module.exports = router;
