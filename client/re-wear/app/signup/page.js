"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const res = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password })
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black mt-20 mb-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Left: Signup Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-2 text-center text-gray-900 tracking-tight">Join ReWear</h2>
          <p className="text-gray-600 mb-8 text-center text-lg font-medium">Create your account and start exchanging fashion sustainably</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base font-semibold mb-1 text-gray-800">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-50 text-gray-900 font-medium" />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1 text-gray-800">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-50 text-gray-900 font-medium" />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1 text-gray-800">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-50 text-gray-900 font-medium" />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1 text-gray-800">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-50 text-gray-900 font-medium" />
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="terms" className="mr-2 accent-blue-700" />
              <label htmlFor="terms" className="text-sm text-gray-700">I agree to the <a href="#" className="text-blue-700 underline font-semibold">Terms of Service</a> and <a href="#" className="text-blue-700 underline font-semibold">Privacy Policy</a></label>
            </div>
            {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
            <button type="submit" className="w-full py-3 bg-blue-900 text-white font-bold rounded-lg shadow-md hover:bg-black transition text-lg tracking-wide">Create Account</button>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <button type="button" className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition font-semibold text-gray-800 text-base">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z" fill="#FFC107"/><path d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.3 4.1-16.7 10.7z" fill="#FF3D00"/><path d="M24 44c5.5 0 10.4-1.8 14.2-4.9l-6.6-5.4C29.7 35.5 27 36.5 24 36.5c-6.1 0-10.7-2.9-11.7-7.5l-7.1 5.5C7.7 39.9 15.3 44 24 44z" fill="#4CAF50"/><path d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-4.6 0-8.3-3.7-8.3-8.3 0-.7.1-1.4.2-2.1l-7.1-5.5C7.3 22.1 6 25.9 6 30c0 7.1 5.8 13 13 13 7.2 0 13-5.8 13-13 0-1.3-.2-2.6-.5-3.8z" fill="#1976D2"/></g></svg>
              Sign up with Google
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600 font-medium">
            Already have an account? <a href="/login" className="text-blue-700 font-bold hover:underline">Sign in</a>
          </div>
        </div>
        {/* Right: Branding & Features */}
        <div className="hidden md:flex w-1/2 bg-blue-900 flex-col justify-center items-center text-white p-12 relative">
          <div className="absolute top-8 left-8 text-2xl font-extrabold flex items-center gap-3">
            <span className="inline-block bg-gray-800 rounded-full p-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#fff" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" /></svg>
            </span>
            <span className="text-white">ReWear</span>
          </div>
          <h3 className="text-3xl font-extrabold mb-4 mt-24 text-white tracking-tight">Sustainable Fashion, Shared by Community</h3>
          <p className="mb-8 text-lg text-gray-200 font-medium">Exchange unused clothes, earn points, and join a movement to reduce textile waste. ReWear makes it easy and rewarding to refresh your wardrobe sustainably.</p>
          <div className="bg-gray-900 bg-opacity-70 rounded-xl p-6 mb-8 w-full max-w-xs border border-gray-800">
            <div className="flex items-center mb-2">
              <span className="bg-gray-800 rounded-full p-2 mr-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
              </span>
              <span className="font-semibold text-white">Community Swaps</span>
            </div>
            <p className="text-sm text-gray-300">Directly swap clothes with others in your area or redeem points for new finds.</p>
          </div>
          <ul className="space-y-3 text-gray-200 text-base font-medium">
            <li className="flex items-center"><span className="mr-2 text-blue-400">✔️</span> Easy, secure exchanges</li>
            <li className="flex items-center"><span className="mr-2 text-blue-400">✔️</span> Earn points for every swap</li>
            <li className="flex items-center"><span className="mr-2 text-blue-400">✔️</span> Reduce textile waste</li>
            <li className="flex items-center"><span className="mr-2 text-blue-400">✔️</span> Track your impact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;