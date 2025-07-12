const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

// GET /api/admin/items/pending - List pending items
router.get('/items/pending', isAuthenticated, isAdmin, adminController.getPendingItems);

// PATCH /api/admin/items/:id/approve - Approve item
router.patch('/items/:id/approve', isAuthenticated, isAdmin, adminController.approveItem);

// PATCH /api/admin/items/:id/reject - Reject item
router.patch('/items/:id/reject', isAuthenticated, isAdmin, adminController.rejectItem);

module.exports = router; 