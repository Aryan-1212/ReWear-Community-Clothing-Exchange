'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  'Men', 'Women', 'Kids', 'Accessories', 'Shoes', 'Bags'
];

const products = [1, 2, 3, 4];

const LandingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/auth/me', {
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) {
          router.replace('/login');
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 border-b border-gray-800 gap-4 md:gap-0">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-gray-800 rounded-full p-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#fff" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" /></svg>
            </span>
            <span className="text-2xl font-extrabold text-white">ReWear</span>
          </div>
          {/* Mobile nav toggle placeholder (for real app, add hamburger menu here) */}
        </div>
        <nav className="hidden md:flex gap-8 text-lg font-semibold w-auto">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">Categories</a>
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="#" className="hover:text-blue-400">Contact</a>
        </nav>
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-black border border-blue-900 transition w-full md:w-auto">Profile</button>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-black border border-red-600 transition w-full md:w-auto ml-2">Logout</button>
        </div>
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

      {/* Images/Banner Section */}
      <section className="px-4 md:px-8 py-8">
        <div className="bg-white rounded-xl h-40 sm:h-48 flex items-center justify-center text-black text-2xl font-bold border border-gray-200 w-full">
          Images / Banner
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 md:px-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {categories.map((cat, idx) => (
            <div key={cat} className="bg-white rounded-lg h-16 sm:h-20 flex items-center justify-center text-black text-base sm:text-lg font-semibold border border-gray-200">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Product Listings */}
      <section className="px-4 md:px-8 pb-12">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Product Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {products.map((p) => (
            <div key={p} className="bg-white rounded-xl h-56 sm:h-64 flex flex-col items-center justify-center text-black border border-gray-200">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg mb-4" />
              <div className="font-bold text-base sm:text-lg mb-1">Product {p}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Description here</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
