"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          router.replace("/login");
        }
        setLoading(false);
      })
      .catch(() => {
        router.replace("/login");
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
        <p className="text-lg text-gray-700 mb-2">Email: {user.email}</p>
        <p className="text-md text-gray-600 mb-2">Role: {user.role}</p>
        <p className="text-md text-gray-600 mb-2">Points: {user.points}</p>
        <button onClick={handleLogout} className="inline-block mt-6 px-6 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-black transition">Logout</button>
      </div>
    </div>
  );
} 