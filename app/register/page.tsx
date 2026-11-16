
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const savedUsers = JSON.parse(
      localStorage.getItem("dinedesk-users") || "[]"
    );

    const existingUser = savedUsers.find(
      (user: { email: string }) =>
        user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      setError("This email is already registered!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email: email.trim().toLowerCase(),
      phone,
      password,
    };

    savedUsers.push(newUser);

    localStorage.setItem(
      "dinedesk-users",
      JSON.stringify(savedUsers)
    );

    setMessage("Registration successful! Please login.");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="flex justify-center items-center px-4 py-12">
        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🍽️</div>

            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join DineDesk and enjoy delicious food!
            </p>
          </div>

          {message && (
            <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-5 text-center">
              {message}
            </p>
          )}

          {error && (
            <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleRegister} className="space-y-5">

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                minLength={6}
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        © 2026 DineDesk. All Rights Reserved.
      </footer>
    </main>
  );
}
