const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/profile', isAuthenticated, userController.getProfile);
router.put('/profile', isAuthenticated, userController.updateProfile);
router.get('/dashboard', isAuthenticated, userController.getDashboard);
router.get('/points', isAuthenticated, userController.getPointsHistory);
router.get('/activity', isAuthenticated, userController.getActivityFeed);

module.exports = router; 