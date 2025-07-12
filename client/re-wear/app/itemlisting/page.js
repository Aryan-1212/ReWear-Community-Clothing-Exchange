'use client'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const product = {
  name: 'Classic Denim Jacket',
  description: 'A timeless denim jacket for all seasons. Sustainably sourced and gently used. Size M. Unisex.',
  details: [
    'Material: 100% Cotton',
    'Condition: Like New',
    'Color: Blue',
    'Size: Medium',
    'Brand: Levi’s',
    'Eco-friendly packaging',
  ],
  mainImage: '',
  images: [1, 2, 3, 4],
};

const imageCarouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 }
    }
  ]
};

const ItemListingPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 border-b border-gray-800 gap-4 md:gap-0">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-gray-800 rounded-full p-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#fff" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" /></svg>
            </span>
            <span className="text-2xl font-extrabold text-white">ReWear</span>
          </div>
        </div>
        <nav className="flex gap-6 text-lg font-semibold w-full md:w-auto justify-center md:justify-end">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">Browse</a>
          <a href="#" className="hover:text-blue-400">Login</a>
          <a href="#" className="hover:text-blue-400">Sign Up</a>
        </nav>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-1 flex justify-center items-start">
            <div className="bg-white rounded-xl border border-gray-200 w-full max-w-xs sm:max-w-sm md:max-w-md h-80 sm:h-96 flex items-center justify-center text-black text-lg font-bold">
              Product Image
            </div>
          </div>
          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white mb-2">{product.name}</h1>
              <p className="text-gray-300 mb-4">{product.description}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-black">
              <ul className="list-disc pl-5 space-y-1 text-gray-800 text-sm">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Product Images Carousel */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">Product Images</h2>
          <Slider {...imageCarouselSettings}>
            {product.images.map((img, idx) => (
              <div key={idx} className="px-2">
                <div className="bg-white rounded-xl border border-gray-200 h-40 flex items-center justify-center text-black">
                  Image {idx + 1}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </main>
    </div>
  );
};

export default ItemListingPage;
