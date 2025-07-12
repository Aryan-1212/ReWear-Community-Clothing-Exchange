const User = require('../models/User');
const Item = require('../models/Item');
const SwapRequest = require('../models/SwapRequest');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        points: user.points,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      totalItems,
      pendingItems,
      approvedItems,
      rejectedItems,
      totalSwapRequests,
      pendingSwapRequests,
      acceptedSwapRequests
    ] = await Promise.all([
      Item.countDocuments({ uploader: userId }),
      Item.countDocuments({ uploader: userId, status: 'pending' }),
      Item.countDocuments({ uploader: userId, status: 'approved' }),
      Item.countDocuments({ uploader: userId, status: 'rejected' }),
      SwapRequest.countDocuments({ requester: userId }),
      SwapRequest.countDocuments({ requester: userId, status: 'pending' }),
      SwapRequest.countDocuments({ requester: userId, status: 'accepted' })
    ]);

    const recentItems = await Item.find({ uploader: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status createdAt');

    const recentSwapRequests = await SwapRequest.find({
      $or: [{ requester: userId }, { owner: userId }]
    })
      .populate('item', 'title images category')
      .populate('requester', 'name email')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalItems,
        pendingItems,
        approvedItems,
        rejectedItems,
        totalSwapRequests,
        pendingSwapRequests,
        acceptedSwapRequests
      },
      recentActivities: {
        recentItems,
        recentSwapRequests
      }
    });
  } catch (err) {
    console.error('Get dashboard error:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard' });
  }
};

exports.getPointsHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const uploadedItems = await Item.find({ uploader: req.user._id })
      .select('title pointsRequired status createdAt');

    const swapRequests = await SwapRequest.find({ requester: req.user._id })
      .populate('item', 'title pointsRequired')
      .select('status createdAt');

    res.json({
      currentPoints: user.points,
      uploadedItems,
      swapRequests
    });
  } catch (err) {
    console.error('Get points history error:', err);
    res.status(500).json({ message: 'Failed to fetch points history' });
  }
};

exports.getActivityFeed = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const userId = req.user._id;

    const items = await Item.find({ uploader: userId })
      .select('title status createdAt')
      .sort({ createdAt: -1 });

    const swapRequests = await SwapRequest.find({
      $or: [{ requester: userId }, { owner: userId }]
    })
      .populate('item', 'title images category')
      .populate('requester', 'name email')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    const activities = [
      ...items.map(item => ({
        type: 'item',
        data: item,
        date: item.createdAt
      })),
      ...swapRequests.map(request => ({
        type: 'swap_request',
        data: request,
        date: request.createdAt
      }))
    ].sort((a, b) => b.date - a.date);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedActivities = activities.slice(startIndex, endIndex);

    res.json({
      activities: paginatedActivities,
      pagination: {
        totalPages: Math.ceil(activities.length / limit),
        currentPage: parseInt(page),
        total: activities.length
      }
    });
  } catch (err) {
    console.error('Get activity feed error:', err);
    res.status(500).json({ message: 'Failed to fetch activity feed' });
  }
}; 