'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Image from 'next/image';
import api from '../../../lib/api';

const ProductDetailPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItem();
  }, [params.id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/items/${params.id}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item:', error);
      setError('Failed to load item details.');
      if (error.response?.status === 401) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      await api.post(`/api/swap-requests`, {
        itemId: item._id
      });
      alert('Swap request sent successfully!');
    } catch (error) {
      console.error('Error sending swap request:', error);
      alert(error.response?.data?.message || 'Failed to send swap request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading item details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Item not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              {item.images && item.images[0] ? (
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <span className="text-6xl">👕</span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{item.title}</h1>
              <div className="space-y-4">
                <p className="text-gray-400">{item.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">Brand</p>
                    <p className="font-semibold">{item.brand}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Category</p>
                    <p className="font-semibold">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Size</p>
                    <p className="font-semibold">{item.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Condition</p>
                    <p className="font-semibold">{item.condition}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-gray-400">Points Required</p>
                  <p className="text-3xl font-bold text-blue-400">{item.pointsRequired || 10} pts</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-6">
                  {user ? (
                    user._id !== item.uploader?._id ? (
                      <button
                        onClick={handleSwapRequest}
                        className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-black border border-blue-900 transition"
                      >
                        Request Swap
                      </button>
                    ) : (
                      <button
                        className="w-full bg-gray-700 text-gray-300 px-6 py-3 rounded-lg font-bold cursor-not-allowed"
                        disabled
                      >
                        Your Item
                      </button>
                    )
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => router.push('/login')}
                        className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-black border border-blue-900 transition"
                      >
                        Login to Swap
                      </button>
                      <button
                        onClick={() => router.push('/signup')}
                        className="w-full bg-white text-blue-900 px-6 py-3 rounded-lg font-bold border border-blue-900 hover:bg-gray-100 transition"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => router.push('/itemlisting')}
                    className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition"
                  >
                    Back to Browse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;