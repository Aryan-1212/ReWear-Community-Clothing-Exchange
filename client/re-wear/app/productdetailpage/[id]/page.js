'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../lib/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [swapLoading, setSwapLoading] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/api/items/${id}`);
      setItem(response.data);
    } catch (error) {
      setError('Item not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setSwapLoading(true);
    try {
      await api.post('/api/swap-requests', {
        requestedItemId: id
      });
      alert('Swap request sent successfully!');
    } catch (error) {
      alert('Failed to send swap request: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setSwapLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading item...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Item not found</div>
          <button 
            onClick={() => router.push('/itemlisting')}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

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

      {/* Main Content */}
      <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-1 flex justify-center items-start">
            <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md h-96 flex items-center justify-center overflow-hidden">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-center p-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-lg">No Image Available</div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">{item.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{item.description}</p>
            </div>

            {/* Item Details */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Item Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.category && (
                  <div>
                    <span className="text-gray-400 text-sm">Category:</span>
                    <div className="text-white font-medium">{item.category}</div>
                  </div>
                )}
                {item.size && (
                  <div>
                    <span className="text-gray-400 text-sm">Size:</span>
                    <div className="text-white font-medium">{item.size}</div>
                  </div>
                )}
                {item.condition && (
                  <div>
                    <span className="text-gray-400 text-sm">Condition:</span>
                    <div className="text-white font-medium capitalize">{item.condition}</div>
                  </div>
                )}
                {item.brand && (
                  <div>
                    <span className="text-gray-400 text-sm">Brand:</span>
                    <div className="text-white font-medium">{item.brand}</div>
                  </div>
                )}
                {item.color && (
                  <div>
                    <span className="text-gray-400 text-sm">Color:</span>
                    <div className="text-white font-medium">{item.color}</div>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 text-sm">Listed by:</span>
                  <div className="text-white font-medium">{item.owner?.name || 'Unknown'}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <>
                  <button
                    onClick={handleSwapRequest}
                    disabled={swapLoading || item.owner?._id === user._id}
                    className="flex-1 px-8 py-4 bg-green-900 text-white font-bold rounded-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {swapLoading ? 'Sending Request...' : 
                     item.owner?._id === user._id ? 'Your Item' : 'Request Swap'}
                  </button>
                  <button
                    onClick={() => router.push('/itemlisting')}
                    className="px-8 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition"
                  >
                    Browse More
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push('/login')}
                    className="flex-1 px-8 py-4 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition"
                  >
                    Login to Swap
                  </button>
                  <button
                    onClick={() => router.push('/signup')}
                    className="px-8 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Owner Info */}
            {item.owner && (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">About the Owner</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                    {item.owner.name?.[0] || 'U'}
                  </div>
                  <div>
                    <div className="text-white font-medium">{item.owner.name}</div>
                    <div className="text-gray-400 text-sm">Member since {new Date(item.owner.createdAt).getFullYear()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage; 