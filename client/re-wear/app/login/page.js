'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && !authLoading) {
      router.replace('/userdashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/userdashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black mt-20 mb-10">
      <div className="w-full max-w-6xl flex">
        {/* Left: Branding, Stats, Features */}
        <div className="hidden md:flex flex-col justify-center w-1/2 bg-blue-900 text-white p-12 rounded-l-2xl shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block bg-gray-800 rounded-full p-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#fff" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" /></svg>
            </span>
            <span className="text-2xl font-extrabold">ReWear</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-2">Welcome Back to Your <span className="text-blue-300">Sustainable Journey</span></h2>
          <p className="text-gray-200 mb-8 text-lg font-medium">Access thousands of pre-loved clothes, connect with the community, and make a positive impact on the planet.</p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-800 bg-opacity-60 rounded-xl p-5 flex flex-col items-start">
              <div className="text-2xl font-bold mb-1">5,000+</div>
              <div className="text-gray-200 text-sm">Items Exchanged</div>
            </div>
            <div className="bg-blue-800 bg-opacity-60 rounded-xl p-5 flex flex-col items-start">
              <div className="text-2xl font-bold mb-1">2,000+</div>
              <div className="text-gray-200 text-sm">Active Members</div>
            </div>
            <div className="bg-blue-800 bg-opacity-60 rounded-xl p-5 flex flex-col items-start">
              <div className="text-2xl font-bold mb-1">98%</div>
              <div className="text-gray-200 text-sm">Satisfaction</div>
            </div>
            <div className="bg-blue-800 bg-opacity-60 rounded-xl p-5 flex flex-col items-start">
              <div className="text-2xl font-bold mb-1">100+</div>
              <div className="text-gray-200 text-sm">Cities Served</div>
            </div>
          </div>
          <ul className="space-y-3 text-gray-200 text-base font-medium mb-4">
            <li className="flex items-center"><span className="mr-2 text-blue-300">✔️</span> Access to unique wardrobes</li>
            <li className="flex items-center"><span className="mr-2 text-blue-300">✔️</span> Real-time swap notifications</li>
            <li className="flex items-center"><span className="mr-2 text-blue-300">✔️</span> Eco-friendly community</li>
          </ul>
        </div>
        {/* Right: Login Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 bg-white rounded-r-2xl shadow-2xl p-10">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Welcome Back</h2>
            <p className="text-gray-600 mb-8 text-center text-lg font-medium">Sign in to your account to continue exchanging</p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-base font-semibold mb-1 text-gray-800">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-50 text-gray-900 font-medium" />
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-gray-800">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-50 text-gray-900 font-medium pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none">
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.5-7.5a10.05 10.05 0 012.908-4.412m2.12-1.415A9.956 9.956 0 0112 5c5 0 9.27 3.11 10.5 7.5a9.956 9.956 0 01-4.198 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.021 2.021A9.956 9.956 0 0021.5 12.5C20.27 8.11 16 5 12 5c-1.02 0-2.01.13-2.96.37" /></svg>
                    )}
                  </button>
                </div>
                <div className="text-right mt-1">
                  <a href="#" className="text-blue-700 text-sm font-semibold hover:underline">Forgot your password?</a>
                </div>
              </div>
              {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-blue-900 text-white font-bold rounded-lg shadow-md hover:bg-black transition text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <div className="text-center">
              <a href="/signup" className="text-blue-700 font-bold hover:underline text-base">Create your account</a>
            </div>
            <footer className="mt-10 text-center text-xs text-gray-400">
              © 2025 ReWear. All rights reserved.<br />
              <a href="#" className="hover:underline">Privacy Policy</a> &nbsp; &nbsp;
              <a href="#" className="hover:underline">Terms of Service</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;