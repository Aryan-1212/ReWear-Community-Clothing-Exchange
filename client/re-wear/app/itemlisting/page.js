'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

const ItemListingPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, selectedCategory]);

  const fetchItems = async () => {
    try {
      const response = await api.get('/api/items');
      // Ensure response.data is an array
      const itemsData = Array.isArray(response.data) ? response.data : [];
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    // Ensure items is an array
    let filtered = Array.isArray(items) ? items : [];
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  };

  const handleSwapRequest = async (itemId) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    try {
      await api.post('/api/swap-requests', {
        requestedItemId: itemId
      });
      alert('Swap request sent successfully!');
    } catch (error) {
      alert('Failed to send swap request');
    }
  };

  const handleViewItem = (itemId) => {
    router.push(`/productdetailpage/${itemId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading items...</div>
      </div>
    );
  }

  // Ensure filteredItems is always an array
  const safeFilteredItems = Array.isArray(filteredItems) ? filteredItems : [];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 border-b border-gray-800 gap-4 md:gap-0">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-gray-800 rounded-full p-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" fill="#fff" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" />
              </svg>
            </span>
            <span className="text-2xl font-extrabold text-white">ReWear</span>
          </div>
        </div>
        <nav className="flex gap-6 text-lg font-semibold w-full md:w-auto justify-center md:justify-end">
          <a href="/itemlisting" className="hover:text-blue-400">Browse</a>
          {user ? (
            <>
              <a href="/userdashboard" className="hover:text-blue-400">Dashboard</a>
              <a href="/add-item" className="hover:text-blue-400">Add Item</a>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-blue-400">Login</a>
              <a href="/signup" className="hover:text-blue-400">Sign Up</a>
            </>
          )}
        </nav>
      </header>

      {/* Search and Filter Bar */}
      <div className="px-4 md:px-8 py-6 border-b border-gray-800">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search for clothes, brands, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:flex-1 px-5 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-5 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium"
          >
            <option value="">All Categories</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="dresses">Dresses</option>
            <option value="outerwear">Outerwear</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Available Items</h1>
          <p className="text-gray-400">Found {safeFilteredItems.length} items</p>
        </div>

        {safeFilteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No items found</div>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {safeFilteredItems.map((item) => (
              <div key={item._id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500 transition">
                <div className="aspect-square bg-gray-800 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-center p-4">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.category && (
                      <span className="px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded-full">
                        {item.category}
                      </span>
                    )}
                    {item.size && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                        {item.size}
                      </span>
                    )}
                    {item.condition && (
                      <span className="px-2 py-1 bg-green-900 text-green-200 text-xs rounded-full">
                        {item.condition}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewItem(item._id)}
                      className="flex-1 px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                    >
                      View Details
                    </button>
                    {user && (
                      <button
                        onClick={() => handleSwapRequest(item._id)}
                        className="px-4 py-2 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition"
                      >
                        Swap
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ItemListingPage;
