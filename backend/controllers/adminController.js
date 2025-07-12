const Item = require('../models/Item');
const User = require('../models/User');
const SwapRequest = require('../models/SwapRequest');

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalItems,
      pendingItems,
      approvedItems,
      rejectedItems,
      totalSwapRequests,
      pendingSwapRequests
    ] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Item.countDocuments({ status: 'pending' }),
      Item.countDocuments({ status: 'approved' }),
      Item.countDocuments({ status: 'rejected' }),
      SwapRequest.countDocuments(),
      SwapRequest.countDocuments({ status: 'pending' })
    ]);

    const recentItems = await Item.find()
      .populate('uploader', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        totalItems,
        pendingItems,
        approvedItems,
        rejectedItems,
        totalSwapRequests,
        pendingSwapRequests
      },
      recentActivities: {
        recentItems,
        recentUsers
      }
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      category,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const items = await Item.find(filter)
      .populate('uploader', 'name email profilePicture')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Item.countDocuments(filter);

    res.json({
      items,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });
  } catch (err) {
    console.error('Get all items error:', err);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.status = 'approved';
    await item.save();

    res.json({ 
      message: 'Item approved successfully',
      item: await item.populate('uploader', 'name email profilePicture')
    });
  } catch (err) {
    console.error('Approve item error:', err);
    res.status(500).json({ message: 'Failed to approve item' });
  }
};

exports.rejectItem = async (req, res) => {
  try {
    const { reason } = req.body;
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.status = 'rejected';
    if (reason) item.rejectionReason = reason;
    await item.save();

    res.json({ 
      message: 'Item rejected successfully',
      item: await item.populate('uploader', 'name email profilePicture')
    });
  } catch (err) {
    console.error('Reject item error:', err);
    res.status(500).json({ message: 'Failed to reject item' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      role,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await User.find(filter)
      .select('-password')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.json({ 
      message: 'User role updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points
      }
    });
  } catch (err) {
    console.error('Update user role error:', err);
    res.status(500).json({ message: 'Failed to update user role' });
  }
};

exports.updateUserPoints = async (req, res) => {
  try {
    const { points } = req.body;
    if (typeof points !== 'number' || points < 0) {
      return res.status(400).json({ message: 'Invalid points value' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points = points;
    await user.save();

    res.json({ 
      message: 'User points updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points
      }
    });
  } catch (err) {
    console.error('Update user points error:', err);
    res.status(500).json({ message: 'Failed to update user points' });
  }
};

exports.getAllSwapRequests = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const swapRequests = await SwapRequest.find(filter)
      .populate('item', 'title images category')
      .populate('requester', 'name email')
      .populate('owner', 'name email')
      .sort(sort)
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
    console.error('Get swap requests error:', err);
    res.status(500).json({ message: 'Failed to fetch swap requests' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userItems = await Item.countDocuments({ uploader: user._id });
    const userSwapRequests = await SwapRequest.countDocuments({
      $or: [{ requester: user._id }, { owner: user._id }]
    });

    if (userItems > 0 || userSwapRequests > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete user with active items or swap requests' 
      });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
