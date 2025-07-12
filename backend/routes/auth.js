const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const authController = require('../controllers/authController');

// Local signup
router.post('/signup', authController.signup);
// Local login
router.post('/login', authController.login);
// Logout
router.post('/logout', authController.logout);
// JWT-protected current user route
router.get('/me', authController.verifyJWT, async (req, res) => {
  const user = await require('../models/User').findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

module.exports = router; 