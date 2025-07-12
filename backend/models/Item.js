const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // Cloudinary URLs
  category: { type: String },
  size: { type: String },
  condition: { type: String },
  tags: [{ type: String }],
  pointsRequired: { type: Number, default: 10 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema); 