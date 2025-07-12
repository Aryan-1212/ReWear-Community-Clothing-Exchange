'use client'
import React, { useRef } from 'react';

const user = {
  name: 'Alex Johnson',
  avatar: '', // Placeholder for profile pic
};

const previousListings = [1, 2, 3, 4];

const ProductDetailPage = () => {
  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 border-b border-gray-800 gap-4 md:gap-0 relative">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-gray-800 rounded-full p-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#fff" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" /></svg>
            </span>
            <span className="text-2xl font-extrabold text-white">ReWear</span>
          </div>
        </div>
        <nav className="flex gap-8 text-lg font-semibold w-full md:w-auto justify-center md:justify-end items-center">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">Browse</a>
          <a href="#" className="hover:text-blue-400">Logout</a>
        </nav>
        {/* User Profile Pic */}
        <a href="/userdashboard" className="ml-4 flex items-center cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-900 flex items-center justify-center text-2xl font-bold text-blue-900">
            {user.name[0]}
          </div>
        </a>
      </header>

      {/* Search Bar */}
      <div className="px-4 md:px-8 py-6 border-b border-gray-800 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search for clothes, brands, or categories..."
          className="w-full sm:flex-1 px-5 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium"
        />
        <button className="bg-blue-900 p-3 rounded-lg hover:bg-black border border-blue-900 transition w-full sm:w-auto flex justify-center items-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-2-2" /></svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Add Images */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="bg-white rounded-xl border border-gray-200 w-full max-w-xs sm:max-w-sm md:max-w-md h-80 sm:h-96 flex flex-col items-center justify-center text-black text-lg font-bold cursor-pointer"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}>
              <span>Add Images</span>
              <input ref={fileInputRef} type="file" className="hidden" multiple />
            </div>
          </div>
          {/* Product Description */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-black relative">
              {/* Removed Healthy Crab tag */}
              <label className="block text-gray-700 font-semibold mb-2">Add Product Description</label>
              <textarea className="w-full h-32 rounded-lg border border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-700" placeholder="Enter product details..." />
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-black border border-blue-900 transition text-lg">Available/Swap</button>
            </div>
          </div>
        </div>

        {/* Previous Listings */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">Previous Listings:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {previousListings.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 h-40 flex items-center justify-center text-black">
                Listing {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
