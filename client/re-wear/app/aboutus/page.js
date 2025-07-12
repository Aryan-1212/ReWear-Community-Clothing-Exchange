'use client'
import React from 'react';

const team = [
  {
    name: 'Aryan Parvani',
    role: 'Lead Developer',
    img: '',
    desc: 'Aryan is the visionary Lead Developer behind ReWear, ensuring seamless integration of all features and leading the team to success.'
  },
  {
    name: 'Krish Shah',
    role: 'Backend Developer',
    img: '',
    desc: 'Krish specializes in backend systems, building robust APIs and ensuring secure, scalable data management for the platform.'
  },
  {
    name: 'Tirth Vyas',
    role: 'Front-End Developer',
    img: '',
    desc: 'Tirth crafts beautiful, user-friendly interfaces, making sure every user enjoys a smooth and engaging experience on ReWear.'
  },
  {
    name: 'Arjun Jani',
    role: 'Front-End Developer',
    img: '',
    desc: 'Arjun brings designs to life with modern web technologies, focusing on responsiveness and accessibility for all users.'
  },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100 px-4 md:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-6">About Us</h1>
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-3 text-center">What is ReWear?</h2>
        <p className="text-gray-200 text-lg leading-relaxed text-justify mx-auto px-2 md:px-6 py-2 rounded-lg bg-gray-900/70 shadow-md" style={{textAlign: 'justify'}}>
          <span className="font-bold text-white">ReWear</span> is a modern community-driven platform dedicated to transforming the way we think about fashion and sustainability. Our mission is to empower individuals to exchange, upcycle, and give new life to pre-loved clothing, reducing textile waste and promoting a circular economy. With ReWear, users can easily swap garments, earn points for eco-friendly actions, and discover unique styles from fellow community members. We believe that fashion should be accessible, affordable, and environmentally responsible. Join us in building a future where every wardrobe refresh is a step towards a greener planet and a more connected community.
        </p>
      </div>
      <h2 className="text-2xl font-bold text-white text-center mb-8">Meet the Team</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((person, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-md">
            <div className="w-24 h-24 rounded-full bg-blue-900 flex items-center justify-center text-3xl font-bold text-white mb-4">
              {person.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="text-xl font-bold text-blue-900 mb-1">{person.name}</div>
            <div className="text-sm font-semibold text-gray-700 mb-2">{person.role}</div>
            <div className="text-gray-600 text-sm">{person.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
