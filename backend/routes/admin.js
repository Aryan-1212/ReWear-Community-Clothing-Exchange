const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/dashboard', isAuthenticated, isAdmin, adminController.getDashboardStats);
router.get('/items', isAuthenticated, isAdmin, adminController.getAllItems);
router.put('/items/:id/approve', isAuthenticated, isAdmin, adminController.approveItem);
router.put('/items/:id/reject', isAuthenticated, isAdmin, adminController.rejectItem);
router.get('/users', isAuthenticated, isAdmin, adminController.getAllUsers);
router.put('/users/:id/role', isAuthenticated, isAdmin, adminController.updateUserRole);
router.put('/users/:id/points', isAuthenticated, isAdmin, adminController.updateUserPoints);
router.delete('/users/:id', isAuthenticated, isAdmin, adminController.deleteUser);
router.get('/swap-requests', isAuthenticated, isAdmin, adminController.getAllSwapRequests);

module.exports = router; 