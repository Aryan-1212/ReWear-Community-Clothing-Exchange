const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const swapController = require('../controllers/swapController');

router.post('/', isAuthenticated, swapController.createSwapRequest);
router.get('/received', isAuthenticated, swapController.getReceivedRequests);
router.get('/sent', isAuthenticated, swapController.getSentRequests);
router.get('/:id', isAuthenticated, swapController.getSwapRequestById);
router.put('/:id/accept', isAuthenticated, swapController.acceptSwapRequest);
router.put('/:id/reject', isAuthenticated, swapController.rejectSwapRequest);
router.delete('/:id', isAuthenticated, swapController.cancelSwapRequest);

module.exports = router; 