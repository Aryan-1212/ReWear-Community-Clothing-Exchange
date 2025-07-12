'use client'
import React, { useState } from 'react';

const userInitial = {
  name: 'Alex Johnson',
  age: 28,
  gender: 'Male',
  email: 'alex.johnson@email.com',
  phone: '+1 555-123-4567',
  city: 'New York',
  points: 320,
  listings: [1, 2, 3, 4],
  purchases: [1, 2, 3, 4],
};

const notificationsData = {
  approved: ['Denim Jacket', 'Summer Dress'],
  pending: ['Classic Tee', 'Sneakers'],
  recent: ['Swap with Priya (Dress for Jacket)', 'Swap with John (Shoes for Tee)'],
};

const UserDashboardPage = () => {
  const [user, setUser] = useState(userInitial);
  const [showEdit, setShowEdit] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    age: user.age,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    setUser({ ...user, ...editForm });
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Edit Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Name</label>
                <input name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-black" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Age</label>
                <input name="age" type="number" value={editForm.age} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-black" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                <input name="email" type="email" value={editForm.email} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-black" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                <input name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-black" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">City</label>
                <input name="city" value={editForm.city} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-black" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Cancel</button>
                <button type="button" onClick={handleEditSave} className="px-4 py-2 rounded-lg bg-blue-900 text-white font-bold hover:bg-black border border-blue-900">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Notifications Modal */}
      {showNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-900 flex items-center"><svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>Notifications</h2>
            <div className="mb-4">
              <div className="font-bold text-blue-900 mb-1">Approved for Swapping</div>
              <ul className="list-disc pl-5 text-gray-800 text-sm">
                {notificationsData.approved.length ? notificationsData.approved.map((item, i) => <li key={i}>{item}</li>) : <li>No approved products.</li>}
              </ul>
            </div>
            <div className="mb-4">
              <div className="font-bold text-blue-900 mb-1">Pending Requests</div>
              <ul className="list-disc pl-5 text-gray-800 text-sm">
                {notificationsData.pending.length ? notificationsData.pending.map((item, i) => <li key={i}>{item}</li>) : <li>No pending requests.</li>}
              </ul>
            </div>
            <div className="mb-4">
              <div className="font-bold text-blue-900 mb-1">Recent Swap Requests</div>
              <ul className="list-disc pl-5 text-gray-800 text-sm">
                {notificationsData.recent.length ? notificationsData.recent.map((item, i) => <li key={i}>{item}</li>) : <li>No recent swaps.</li>}
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => setShowNotif(false)} className="px-4 py-2 rounded-lg bg-blue-900 text-white font-bold hover:bg-black border border-blue-900">Close</button>
            </div>
          </div>
        </div>
      )}
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

      {/* Main Dashboard Section */}
      <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 border border-gray-800">
          {/* Profile Avatar & Info */}
          <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-1/3">
            <div className="w-32 h-32 rounded-full bg-white border-4 border-blue-900 flex items-center justify-center text-4xl font-bold text-blue-900 mb-2">{user.name[0]}</div>
            <div className="space-y-1 text-center lg:text-left">
              <div className="text-xl font-bold text-white">{user.name}</div>
              <div className="text-gray-400 text-sm">Age: {user.age}</div>
              <div className="text-gray-400 text-sm">Gender: {user.gender}</div>
              <div className="text-gray-400 text-sm">Email: {user.email}</div>
              <div className="text-gray-400 text-sm">Phone: {user.phone}</div>
              <div className="text-gray-400 text-sm">City: {user.city}</div>
            </div>
          </div>
          {/* Buttons & Points */}
          <div className="flex-1 flex flex-col gap-6 justify-center">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button onClick={() => setShowEdit(true)} className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-black border border-blue-900 transition text-lg w-full sm:w-auto">Edit Profile</button>
              <button onClick={() => setShowNotif(true)} className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold border border-blue-900 hover:bg-gray-100 transition text-lg w-full sm:w-auto flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                Notifications
              </button>
            </div>
            <div className="bg-white rounded-xl border border-blue-900 p-6 flex items-center justify-center text-3xl font-extrabold text-blue-900 min-h-[90px]">
              Points: <span className="ml-3 text-4xl">{user.points}</span>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">My Listings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {user.listings.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 h-40 flex items-center justify-center text-black">
                Listing {idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* My Purchases */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">My Purchases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {user.purchases.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 h-40 flex items-center justify-center text-black">
                Purchase {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardPage;
