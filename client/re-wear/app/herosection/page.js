'use client'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
// No auth logic needed for public hero section

const featuredItems = [
  { id: 1, name: 'Denim Jacket', img: '', desc: 'Trendy and sustainable.' },
  { id: 2, name: 'Summer Dress', img: '', desc: 'Light and breezy.' },
  { id: 3, name: 'Classic Tee', img: '', desc: 'Everyday comfort.' },
  { id: 4, name: 'Sneakers', img: '', desc: 'Walk in style.' },
  { id: 5, name: 'Hoodie', img: '', desc: 'Cozy and cool.' },
  { id: 6, name: 'Jeans', img: '', desc: 'Classic fit.' },
];

const testimonials = [
  { id: 1, name: 'Alex', text: 'ReWear helped me refresh my wardrobe sustainably!' },
  { id: 2, name: 'Priya', text: 'Great community and awesome clothes.' },
];

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 3 }
    },
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

const HeroSectionPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-12 px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Swap. Save. Sustain.</h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">Join ReWear and start swapping clothes with the community. Refresh your wardrobe, reduce waste, and make a positive impact on the planet.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-black border border-blue-900 transition text-lg text-center">Start Swapping</Link>
          <Link href="/itemlisting" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold border border-blue-900 hover:bg-gray-100 transition text-lg text-center">Browse Items</Link>
        </div>
      </section>

      {/* Carousel of Featured Items */}
      <section className="px-4 md:px-8 py-8">
        <h2 className="text-xl font-bold text-white mb-4">Featured Clothing Items</h2>
        <Slider {...carouselSettings}>
          {featuredItems.map(item => (
            <div key={item.id} className="px-2">
              <div className="bg-white rounded-xl p-4 flex flex-col items-center border border-gray-200 text-black">
                <div className="w-24 h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-2xl font-bold">👕</div>
                <div className="font-bold text-lg mb-1">{item.name}</div>
                <div className="text-gray-600 text-sm text-center">{item.desc}</div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonials / Impact Metrics (Optional) */}
      <section className="px-4 md:px-8 py-8">
        <h2 className="text-xl font-bold text-white mb-4">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white rounded-xl p-6 border border-gray-200 text-black">
              <div className="font-bold mb-2">{t.name}</div>
              <div className="text-gray-700">"{t.text}"</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSectionPage;
