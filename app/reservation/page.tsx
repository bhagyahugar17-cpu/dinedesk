
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ReservationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");

  const handleReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reservation = {
      id: "RES" + Date.now(),
      name,
      phone,
      date,
      time,
      guests,
      status: "Confirmed",
    };

    const existingReservations = JSON.parse(
      localStorage.getItem("dinedesk-reservations") || "[]"
    );

    existingReservations.push(reservation);

    localStorage.setItem(
      "dinedesk-reservations",
      JSON.stringify(existingReservations)
    );

    setMessage("Your table has been reserved successfully!");

    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setGuests("2");
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Table Reservation
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-8">
            Book your table at DineDesk Restaurant.
          </p>

          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleReservation} className="space-y-5">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Customer Name
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
                Reservation Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toLocaleDateString("en-CA")}
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Reservation Time
              </label>

              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              >
                <option value="">Select a time</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="9:00 PM">9:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Number of Guests
              </label>

              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 text-gray-900"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
                <option value="7">7 Guests</option>
                <option value="8">8 Guests</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
              Reserve Table
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        © 2026 DineDesk. All Rights Reserved.
      </footer>
    </main>
  );
}
