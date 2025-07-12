'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

const UserDashboardPage = () => {
  const { user, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [swapRequests, setSwapRequests] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
  });

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
      return;
    }
    
    if (user) {
      fetchUserData();
    }
  }, [user, loading, router]);

  const fetchUserData = async () => {
    try {
      const [itemsRes, requestsRes] = await Promise.all([
        api.get('/api/items/user/items'),
        api.get('/api/swap-requests/sent')
      ]);
      setUserItems(itemsRes.data.items || []);
      setSwapRequests(requestsRes.data.swapRequests || []);
      setFetchError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setFetchError(error?.response?.data?.message || error.message || 'An error occurred while fetching your data.');
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    setLoading(true);
    const result = await updateProfile(editForm);
    if (result.success) {
      setShowEdit(false);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <div className="text-xl">{fetchError}</div>
      </div>
    );
  }

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

      {/* Main Dashboard Section */}
      <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 border border-gray-800">
          {/* Profile Avatar & Info */}
          <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-1/3">
            <div className="w-32 h-32 rounded-full bg-white border-4 border-blue-900 flex items-center justify-center text-4xl font-bold text-blue-900 mb-2">{user?.name?.[0] || 'U'}</div>
            <div className="space-y-1 text-center lg:text-left">
              <div className="text-xl font-bold text-white">{user?.name || 'User'}</div>
              <div className="text-gray-400 text-sm">Email: {user?.email || 'N/A'}</div>
              <div className="text-gray-400 text-sm">Phone: {user?.phone || 'N/A'}</div>
              <div className="text-gray-400 text-sm">City: {user?.city || 'N/A'}</div>
              <div className="text-gray-400 text-sm">Role: {user?.role || 'User'}</div>
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
              Points: <span className="ml-3 text-4xl">{user?.points || 0}</span>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">My Listings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {userItems.length > 0 ? (
              userItems.map((item, idx) => (
                <div key={item._id || idx} className="bg-white rounded-xl border border-gray-200 h-40 flex flex-col items-center justify-center text-black p-4">
                  <div className="font-semibold text-sm text-center">{item.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{item.category}</div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                No listings yet. <a href="/add-item" className="text-blue-400 hover:underline">Add your first item!</a>
              </div>
            )}
          </div>
        </div>

        {/* Swap Requests */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">My Swap Requests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {swapRequests.length > 0 ? (
              swapRequests.map((request, idx) => (
                <div key={request._id || idx} className="bg-white rounded-xl border border-gray-200 p-4 text-black">
                  <div className="font-semibold">{request.status}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {request.requestedItem?.title} ↔ {request.offeredItem?.title}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                No swap requests yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardPage;
