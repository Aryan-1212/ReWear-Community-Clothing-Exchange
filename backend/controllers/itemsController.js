const Item = require('../models/Item');

// POST /api/items
exports.createItem = async (req, res) => {
  try {
    const { title, description, images, category, size, condition, tags, pointsRequired } = req.body;
    const item = await Item.create({
      title,
      description,
      images,
      category,
      size,
      condition,
      tags,
      pointsRequired,
      uploader: req.user._id,
      status: 'pending'
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/items
exports.getApprovedItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'approved' });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/items/:id
exports.getApprovedItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, status: 'approved' });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/user/items
exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ uploader: req.user._id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/items/:id
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    // Only uploader can delete if not approved, or admin can delete any
    if (
      (item.uploader.toString() === req.user._id.toString() && item.status !== 'approved') ||
      req.user.role === 'admin'
    ) {
      await item.deleteOne();
      return res.json({ message: 'Item deleted' });
    }
    res.status(403).json({ message: 'Not authorized to delete this item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
