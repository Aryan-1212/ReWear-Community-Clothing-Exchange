'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock user data
const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '',
    details: 'Active user, 5 listings, 2 swaps',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: '',
    details: 'Active user, 2 listings, 1 swap',
  },
  {
    id: 3,
    name: 'Carol Lee',
    email: 'carol@example.com',
    avatar: '',
    details: 'Active user, 7 listings, 4 swaps',
  },
];

const AdminPanel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Auth check: only allow admin
    fetch('http://localhost:5000/auth/me', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) {
          router.replace('/login');
        } else {
          const data = await res.json();
          setUser(data);
          if (data.role !== 'admin') {
            router.replace('/landingpage');
          } else {
            setLoading(false);
          }
        }
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-800">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold mb-4 md:mb-0 text-center w-full md:w-auto">Admin Panel</h1>
          <div className="flex gap-4 w-full md:w-auto justify-center md:justify-end">
            <button className="bg-gray-800 border border-white rounded-lg px-6 py-2 font-bold hover:bg-blue-900 transition">Manage User</button>
            <button className="bg-gray-800 border border-white rounded-lg px-6 py-2 font-bold hover:bg-blue-900 transition">Manage Orders</button>
            <button className="bg-gray-800 border border-white rounded-lg px-6 py-2 font-bold hover:bg-blue-900 transition">Manage Listings</button>
          </div>
        </div>
        {/* Manage Users Section */}
        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Manage Users</h2>
        <div className="flex flex-col gap-6">
          {users.map((u) => (
            <div key={u.id} className="flex flex-col md:flex-row items-center bg-black border border-gray-700 rounded-xl p-4 gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-3xl font-bold text-white mb-2 md:mb-0">
                {u.avatar ? <img src={u.avatar} alt={u.name} className="w-20 h-20 rounded-full object-cover" /> : u.name[0]}
              </div>
              {/* Details */}
              <div className="flex-1 w-full md:w-auto bg-gray-900 rounded-lg p-4 text-base font-medium mb-2 md:mb-0">
                <div className="font-bold text-lg mb-1">{u.name}</div>
                <div className="text-gray-400 mb-1">{u.email}</div>
                <div className="text-gray-300">{u.details}</div>
              </div>
              {/* Actions */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="bg-gray-800 border border-white rounded-lg px-6 py-2 font-bold hover:bg-blue-900 transition">Edit Listings/Swaps</button>
                <button className="bg-gray-800 border border-white rounded-lg px-6 py-2 font-bold hover:bg-red-700 transition">Delete Listings</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 