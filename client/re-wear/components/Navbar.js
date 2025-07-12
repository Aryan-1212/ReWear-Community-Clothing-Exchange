'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 border-b border-gray-800 gap-4 md:gap-0 bg-black text-white">
      <div className="flex items-center gap-3 w-full md:w-auto justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-block bg-gray-800 rounded-full p-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" fill="#fff" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m0 0H8m4 0h4" />
            </svg>
          </span>
          <span className="text-2xl font-extrabold">ReWear</span>
        </Link>
      </div>
      
      <nav className="flex gap-6 text-lg font-semibold w-full md:w-auto justify-center md:justify-end">
        <Link href="/itemlisting" className={`hover:text-blue-400 ${pathname === '/itemlisting' ? 'text-blue-400' : ''}`}>
          Browse
        </Link>
        
        {user ? (
          <>
            <Link href="/add-item" className={`hover:text-blue-400 ${pathname === '/add-item' ? 'text-blue-400' : ''}`}>
              Add Item
            </Link>
            <Link href="/userdashboard" className={`hover:text-blue-400 ${pathname === '/userdashboard' ? 'text-blue-400' : ''}`}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className="hover:text-blue-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={`hover:text-blue-400 ${pathname === '/login' ? 'text-blue-400' : ''}`}>
              Login
            </Link>
            <Link href="/signup" className={`hover:text-blue-400 ${pathname === '/signup' ? 'text-blue-400' : ''}`}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
