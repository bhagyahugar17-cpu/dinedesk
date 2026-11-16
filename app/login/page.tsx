
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("dinedesk-users") || "[]"
      );

      const user = savedUsers.find(
        (u: { email: string; password: string }) =>
          u.email === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!user) {
        setError("Invalid email or password!");
        return;
      }

      localStorage.setItem(
        "dinedesk-current-user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        })
      );

      setSuccess("Login successful! Welcome to DineDesk.");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      setError("Unable to login. Please register again.");
    }
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="flex justify-center items-center px-4 py-16">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🍽️</div>

            <h1 className="text-3xl font-bold text-gray-900">
              Customer Login
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back to DineDesk!
            </p>
          </div>

          {error && (
            <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-5 text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
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
                placeholder="Enter your password"
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-orange-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          <p className="text-center mt-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-orange-600"
            >
              Back to Home
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
