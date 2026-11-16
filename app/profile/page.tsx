
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function ProfilePage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("dinedesk-current-user");

    if (savedUser) {
      try {
        setCustomer(JSON.parse(savedUser));
      } catch {
        setCustomer(null);
      }
    }

    setLoading(false);
  }, []);

  const handleSave = () => {
    if (!customer) return;

    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!/^\d{10}$/.test(customer.phone)) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    localStorage.setItem("dinedesk-current-user", JSON.stringify(customer));

    const users = JSON.parse(localStorage.getItem("dinedesk-users") || "[]");
    const updatedUsers = users.map((user: Customer) =>
      user.id === customer.id ? { ...user, ...customer } : user
    );

    localStorage.setItem("dinedesk-users", JSON.stringify(updatedUsers));

    setEditing(false);
    setMessage("Profile updated successfully!");
    window.dispatchEvent(new Event("storage"));
  };

  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  if (!customer) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <a href="/login" className="text-orange-600 underline">
            Login Now
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-500 mb-8">
            Manage your DineDesk account details.
          </p>

          {message && (
            <p className="mb-5 text-green-600">{message}</p>
          )}

          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                value={customer.name}
                disabled={!editing}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                className="w-full border rounded-lg p-3 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <input
                type="email"
                value={customer.email}
                disabled={!editing}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                className="w-full border rounded-lg p-3 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Mobile Number</label>
              <input
                type="tel"
                value={customer.phone}
                disabled={!editing}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                className="w-full border rounded-lg p-3 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    const savedUser = localStorage.getItem("dinedesk-current-user");
                    if (savedUser) setCustomer(JSON.parse(savedUser));
                    setEditing(false);
                    setMessage("");
                  }}
                  className="border px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setEditing(true);
                  setMessage("");
                }}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg"
              >
                Edit Profile
              </button>
            )}

            <a
              href="/orders"
              className="border px-6 py-3 rounded-lg"
            >
              My Orders
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
