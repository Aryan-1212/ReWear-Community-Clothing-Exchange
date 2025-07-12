const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (imageBuffer, folder = 'rewear') => {
  try {
    const base64Image = imageBuffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

const uploadMultipleToCloudinary = async (imageBuffers, folder = 'rewear') => {
  try {
    const uploadPromises = imageBuffers.map(buffer => uploadToCloudinary(buffer, folder));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Multiple image upload error:', error);
    throw new Error('Failed to upload images to Cloudinary');
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

module.exports = {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary
}; 