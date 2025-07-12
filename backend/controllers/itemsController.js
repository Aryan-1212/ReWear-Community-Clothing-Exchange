const Item = require('../models/Item');
const User = require('../models/User');
const { uploadToCloudinary, uploadMultipleToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUpload');

exports.createItem = async (req, res) => {
  try {
    const { title, description, category, size, condition, brand, color, price } = req.body;
    
    if (!title || !category) {
      return res.status(400).json({ 
        message: 'Title and category are required' 
      });
    }

    let imageUrl = '';
    if (req.file) {
      try {
        const imageBuffer = req.file.buffer;
        imageUrl = await uploadToCloudinary(imageBuffer, 'rewear/items');
      } catch (uploadError) {
        return res.status(400).json({ 
          message: 'Failed to upload image',
          error: uploadError.message 
        });
      }
    }

    const item = await Item.create({
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
      category,
      size,
      condition,
      brand,
      color,
      pointsRequired: price ? parseInt(price) : 10,
      uploader: req.user._id,
      status: 'pending'
    });

    await item.populate('uploader', 'name email profilePicture');

    res.status(201).json({
      message: 'Item uploaded successfully and pending approval',
      item
    });
  } catch (err) {
    console.error('Create item error:', err);
    res.status(400).json({ 
      message: 'Failed to create item',
      error: err.message 
    });
  }
};

exports.getApprovedItems = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      size, 
      condition,
      search,
      minPoints,
      maxPoints,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    const filter = { status: 'approved' };
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (minPoints || maxPoints) {
      filter.pointsRequired = {};
      if (minPoints) filter.pointsRequired.$gte = parseInt(minPoints);
      if (maxPoints) filter.pointsRequired.$lte = parseInt(maxPoints);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const items = await Item.find(filter)
      .populate('uploader', 'name email profilePicture')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Item.countDocuments(filter);

    const categories = await Item.distinct('category', { status: 'approved' });
    const sizes = await Item.distinct('size', { status: 'approved' });
    const conditions = await Item.distinct('condition', { status: 'approved' });

    res.json({
      items,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      filters: {
        categories,
        sizes,
        conditions
      }
    });
  } catch (err) {
    console.error('Get approved items error:', err);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

exports.getApprovedItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, status: 'approved' })
      .populate('uploader', 'name email profilePicture points');
    
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    res.json(item);
  } catch (err) {
    console.error('Get item by ID error:', err);
    res.status(500).json({ message: 'Failed to fetch item' });
  }
};

exports.getUserItems = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { uploader: req.user._id };
    if (status) filter.status = status;

    const items = await Item.find(filter)
      .populate('uploader', 'name email profilePicture')
      .sort({ createdAt: -1 })
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
    console.error('Get user items error:', err);
    res.status(500).json({ message: 'Failed to fetch user items' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { title, description, category, size, condition, tags, pointsRequired } = req.body;
    
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    if (item.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }
    
    if (item.status === 'approved') {
      return res.status(400).json({ message: 'Cannot update approved items' });
    }

    let imageUrls = item.images || [];
    if (req.files && req.files.length > 0) {
      try {
        const imageBuffers = req.files.map(file => file.buffer);
        const newImageUrls = await uploadMultipleToCloudinary(imageBuffers, 'rewear/items');
        imageUrls = [...imageUrls, ...newImageUrls];
      } catch (uploadError) {
        return res.status(400).json({ 
          message: 'Failed to upload images',
          error: uploadError.message 
        });
      }
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        images: imageUrls,
        category,
        size,
        condition,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : item.tags,
        pointsRequired: pointsRequired || item.pointsRequired,
        status: 'pending'
      },
      { new: true }
    ).populate('uploader', 'name email profilePicture');

    res.json({
      message: 'Item updated successfully',
      item: updatedItem
    });
  } catch (err) {
    console.error('Update item error:', err);
    res.status(400).json({ 
      message: 'Failed to update item',
      error: err.message 
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    if (
      (item.uploader.toString() === req.user._id.toString() && item.status !== 'approved') ||
      req.user.role === 'admin'
    ) {
      if (item.images && item.images.length > 0) {
        try {
          for (const imageUrl of item.images) {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
          }
        } catch (deleteError) {
          console.error('Failed to delete images from Cloudinary:', deleteError);
        }
      }
      
      await item.deleteOne();
      return res.json({ message: 'Item deleted successfully' });
    }
    
    res.status(403).json({ message: 'Not authorized to delete this item' });
  } catch (err) {
    console.error('Delete item error:', err);
    res.status(500).json({ message: 'Failed to delete item' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Item.distinct('category', { status: 'approved' });
    res.json(categories);
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

exports.getItemStats = async (req, res) => {
  try {
    const totalItems = await Item.countDocuments({ status: 'approved' });
    const totalCategories = await Item.distinct('category', { status: 'approved' });
    const avgPoints = await Item.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, avgPoints: { $avg: '$pointsRequired' } } }
    ]);

    res.json({
      totalItems,
      totalCategories: totalCategories.length,
      avgPointsRequired: avgPoints[0]?.avgPoints || 0
    });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};
