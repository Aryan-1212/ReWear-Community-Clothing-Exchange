const SwapRequest = require('../models/SwapRequest');
const Item = require('../models/Item');
const User = require('../models/User');

exports.createSwapRequest = async (req, res) => {
  try {
    const { itemId } = req.body;
    
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Temporarily allow swapping of all items, not just approved ones
    // if (item.status !== 'approved') {
    //   return res.status(400).json({ message: 'Item is not available for swapping' });
    // }

    if (item.uploader.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot request your own item' });
    }

    const user = await User.findById(req.user._id);
    if (user.points < item.pointsRequired) {
      return res.status(400).json({ 
        message: `Insufficient points. You need ${item.pointsRequired} points to request this item.` 
      });
    }

    const existingRequest = await SwapRequest.findOne({
      item: itemId,
      requester: req.user._id,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request for this item' });
    }

    const swapRequest = await SwapRequest.create({
      item: itemId,
      requester: req.user._id,
      owner: item.uploader,
      status: 'pending'
    });

    await swapRequest.populate([
      { path: 'item', select: 'title images category pointsRequired' },
      { path: 'requester', select: 'name email profilePicture points' },
      { path: 'owner', select: 'name email profilePicture' }
    ]);

    res.status(201).json({
      message: 'Swap request created successfully',
      swapRequest
    });
  } catch (err) {
    console.error('Create swap request error:', err);
    res.status(500).json({ message: 'Failed to create swap request' });
  }
};

exports.getReceivedRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { owner: req.user._id };
    if (status) filter.status = status;

    const swapRequests = await SwapRequest.find(filter)
      .populate('item', 'title images category pointsRequired')
      .populate('requester', 'name email profilePicture points')
      .populate('owner', 'name email profilePicture')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SwapRequest.countDocuments(filter);

    res.json({
      swapRequests,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });
  } catch (err) {
    console.error('Get received requests error:', err);
    res.status(500).json({ message: 'Failed to fetch received requests' });
  }
};

exports.getSentRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { requester: req.user._id };
    if (status) filter.status = status;

    const swapRequests = await SwapRequest.find(filter)
      .populate('item', 'title images category pointsRequired')
      .populate('requester', 'name email profilePicture points')
      .populate('owner', 'name email profilePicture')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SwapRequest.countDocuments(filter);

    res.json({
      swapRequests,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });
  } catch (err) {
    console.error('Get sent requests error:', err);
    res.status(500).json({ message: 'Failed to fetch sent requests' });
  }
};

exports.acceptSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swapRequest.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to accept this request' });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request is not pending' });
    }

    const requester = await User.findById(swapRequest.requester);
    const item = await Item.findById(swapRequest.item);
    
    if (requester.points < item.pointsRequired) {
      return res.status(400).json({ 
        message: 'Requester no longer has enough points for this item' 
      });
    }

    swapRequest.status = 'accepted';
    await swapRequest.save();

    requester.points -= item.pointsRequired;
    await requester.save();

    const owner = await User.findById(swapRequest.owner);
    owner.points += item.pointsRequired;
    await owner.save();

    item.status = 'swapped';
    await item.save();

    await swapRequest.populate([
      { path: 'item', select: 'title images category pointsRequired' },
      { path: 'requester', select: 'name email profilePicture points' },
      { path: 'owner', select: 'name email profilePicture points' }
    ]);

    res.json({
      message: 'Swap request accepted successfully',
      swapRequest
    });
  } catch (err) {
    console.error('Accept swap request error:', err);
    res.status(500).json({ message: 'Failed to accept swap request' });
  }
};

exports.rejectSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swapRequest.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to reject this request' });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request is not pending' });
    }

    swapRequest.status = 'rejected';
    await swapRequest.save();

    await swapRequest.populate([
      { path: 'item', select: 'title images category pointsRequired' },
      { path: 'requester', select: 'name email profilePicture' },
      { path: 'owner', select: 'name email profilePicture' }
    ]);

    res.json({
      message: 'Swap request rejected successfully',
      swapRequest
    });
  } catch (err) {
    console.error('Reject swap request error:', err);
    res.status(500).json({ message: 'Failed to reject swap request' });
  }
};

exports.cancelSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swapRequest.requester.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this request' });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request is not pending' });
    }

    await swapRequest.deleteOne();

    res.json({ message: 'Swap request cancelled successfully' });
  } catch (err) {
    console.error('Cancel swap request error:', err);
    res.status(500).json({ message: 'Failed to cancel swap request' });
  }
};

exports.getSwapRequestById = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate('item', 'title images category pointsRequired')
      .populate('requester', 'name email profilePicture points')
      .populate('owner', 'name email profilePicture');

    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (
      swapRequest.requester.toString() !== req.user._id.toString() &&
      swapRequest.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this request' });
    }

    res.json(swapRequest);
  } catch (err) {
    console.error('Get swap request error:', err);
    res.status(500).json({ message: 'Failed to fetch swap request' });
  }
}; 