const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const itemsController = require('../controllers/itemsController');
const upload = require('../middleware/upload');

router.post('/', isAuthenticated, upload.array('images', 5), itemsController.createItem);
router.get('/', itemsController.getApprovedItems);
router.get('/categories', itemsController.getCategories);
router.get('/stats', itemsController.getItemStats);
router.get('/:id', itemsController.getApprovedItemById);
router.put('/:id', isAuthenticated, upload.array('images', 5), itemsController.updateItem);
router.delete('/:id', isAuthenticated, itemsController.deleteItem);
router.get('/user/items', isAuthenticated, itemsController.getUserItems);

module.exports = router; 