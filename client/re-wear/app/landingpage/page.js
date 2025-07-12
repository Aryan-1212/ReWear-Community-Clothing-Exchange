'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const categories = [
  'Men', 'Women', 'Kids', 'Accessories', 'Shoes', 'Bags'
];

const LandingPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Hero Section */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Exchange Clothes, <span className="text-blue-400">Make an Impact</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join our community of conscious fashion lovers. Swap clothes, reduce waste,
            and refresh your wardrobe sustainably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <button
                onClick={() => router.push('/itemlisting')}
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-black border border-blue-900 transition text-lg"
              >
                Browse Items
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push('/signup')}
                  className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-black border border-blue-900 transition text-lg"
                >
                  Join Now
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-transparent text-white px-8 py-3 rounded-lg font-bold border border-white hover:bg-white hover:text-black transition text-lg"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-black p-6 rounded-xl text-center cursor-pointer hover:bg-blue-900 transition"
                onClick={() => router.push('/itemlisting')}
              >
                <div className="text-3xl mb-2">
                  {category === 'Men' && '👔'}
                  {category === 'Women' && '👗'}
                  {category === 'Kids' && '🧸'}
                  {category === 'Accessories' && '👜'}
                  {category === 'Shoes' && '👟'}
                  {category === 'Bags' && '🎒'}
                </div>
                <div className="font-semibold">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2">List Your Items</h3>
              <p className="text-gray-400">Upload photos and details of clothes you want to swap.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-2">Make Swaps</h3>
              <p className="text-gray-400">Find items you like and propose swaps with other members.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-xl font-bold mb-2">Reduce Waste</h3>
              <p className="text-gray-400">Give pre-loved clothes a second life and help the environment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
