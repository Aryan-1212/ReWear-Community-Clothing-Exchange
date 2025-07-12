const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const itemsController = require('../controllers/itemsController');

// POST /api/items - Upload new item
router.post('/', isAuthenticated, itemsController.createItem);

// GET /api/items - List approved items
router.get('/', itemsController.getApprovedItems);

// GET /api/items/:id - Get single approved item
router.get('/:id', itemsController.getApprovedItemById);

// GET /api/user/items - Get items uploaded by current user
router.get('/user/items', isAuthenticated, itemsController.getUserItems);

// DELETE /api/items/:id - Delete item (user or admin)
router.delete('/:id', isAuthenticated, itemsController.deleteItem);

module.exports = router; 