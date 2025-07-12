const Item = require('../models/Item');

// GET /api/admin/items/pending
exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'pending' });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/items/:id/approve
exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.status = 'approved';
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/items/:id/reject
exports.rejectItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.status = 'rejected';
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
