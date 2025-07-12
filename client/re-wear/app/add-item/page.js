'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

const AddItemPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: 'good',
    brand: '',
    color: '',
    price: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      if (image) {
        formDataToSend.append('image', image);
      }

      const response = await api.post('/api/items', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if the response indicates success (backend returns message and item)
      if (response.data.message && response.data.item) {
        router.push('/userdashboard');
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="inline-block bg-gray-800 rounded-full p-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" fill="#fff" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" />
            </svg>
          </span>
          <span className="text-2xl font-extrabold text-white">ReWear</span>
        </div>
        <nav className="flex gap-6 text-lg font-semibold">
          <a href="/itemlisting" className="hover:text-blue-400">Browse</a>
          <a href="/userdashboard" className="hover:text-blue-400">Dashboard</a>
        </nav>
      </header>

      <main className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-8">Add New Item</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold mb-2 text-gray-200">Item Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white"
                  placeholder="e.g., Vintage Denim Jacket"
                />
              </div>

              <div>
                <label className="block text-base font-semibold mb-2 text-gray-200">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white"
                >
                  <option value="">Select Category</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="dresses">Dresses</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-semibold mb-2 text-gray-200">Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white"
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-semibold mb-2 text-gray-200">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-semibold mb-2 text-gray-200">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white"
                  placeholder="e.g., Levi's"
                />
              </div>

              <div>
                <label className="block text-base font-semibold mb-2 text-gray-200">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white"
                  placeholder="e.g., Blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold mb-2 text-gray-200">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white"
                placeholder="Describe your item in detail..."
              />
            </div>

            <div>
              <label className="block text-base font-semibold mb-2 text-gray-200">Item Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-400 text-sm font-semibold">{error}</div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Item...' : 'Add Item'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/userdashboard')}
                className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddItemPage; 