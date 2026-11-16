
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Customer = {
  name: string;
  email: string;
};

export default function Navbar() {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("dinedesk-current-user");

    if (savedUser) {
      try {
        setCustomer(JSON.parse(savedUser));
      } catch {
        setCustomer(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dinedesk-current-user");
    setCustomer(null);
    window.location.href = "/";
  };

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 px-8 py-5 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold text-orange-600">
        DineDesk.
      </Link>

      <div className="flex flex-wrap items-center gap-5 text-gray-700">
        <Link href="/" className="hover:text-orange-600">Home</Link>

        <Link href="/menu" className="hover:text-orange-600">Menu</Link>

        <Link href="/reservation" className="hover:text-orange-600">
          Reservations
        </Link>

        <Link href="/orders" className="hover:text-orange-600">
          My Orders
        </Link>

        <Link href="/cart" className="hover:text-orange-600">
          Cart 🛒
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {customer ? (
          <>
            <Link
              href="/profile"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              Hi, {customer.name}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-orange-600 text-white px-5 py-2 rounded-full hover:bg-orange-700"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="border border-orange-600 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
