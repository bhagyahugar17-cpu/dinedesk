
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Order = {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  payment: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  orderDate: string;
  status: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
useEffect(() => {
  const isAdmin = localStorage.getItem("dinedesk-admin");

  if (isAdmin !== "true") {
    window.location.href = "/admin-login";
    return;
  }

  const savedOrders = localStorage.getItem("dinedesk-orders");

  if (savedOrders) {
    try {
      setOrders(JSON.parse(savedOrders));
    } catch {
      setOrders([]);
    }
  }
const savedReservations = localStorage.getItem(
  "dinedesk-reservations"
);

if (savedReservations) {
  try {
    setReservations(JSON.parse(savedReservations));
  } catch {
    setReservations([]);
  }
}
  setLoaded(true);
}, []);
 

  const updateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem(
      "dinedesk-orders",
      JSON.stringify(updatedOrders)
    );
  };
const updateReservationStatus = (
  reservationId: string,
  newStatus: string
) => {
  const updatedReservations = reservations.map((reservation) =>
    reservation.id === reservationId
      ? { ...reservation, status: newStatus }
      : reservation
  );

  setReservations(updatedReservations);

  localStorage.setItem(
    "dinedesk-reservations",
    JSON.stringify(updatedReservations)
  );
};
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const totalItems = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (itemSum, item) => itemSum + item.quantity,
        0
      ),
    0
  );

  if (!loaded) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        
<div className="flex flex-wrap justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">
      Admin Dashboard
    </h1>

    <p className="text-gray-600 mt-2">
      Manage restaurant orders and monitor sales.
    </p>
  </div>

  <button
    type="button"
    onClick={() => {
      localStorage.removeItem("dinedesk-admin");
      window.location.href = "/admin-login";
    }}
    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
  >
    Logout
  </button>
</div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold text-orange-600 mt-3">
              {orders.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Total Revenue</p>
            <h2 className="text-3xl font-bold text-green-600 mt-3">
              ₹{totalRevenue}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Items Sold</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-3">
              {totalItems}
            </h2>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Customer Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No customer orders available yet.
            </p>
          ) : (
            <table className="w-full text-left min-w-[750px]">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-3">Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-b">
                    <td className="py-4 text-sm text-gray-700">
                      {order.orderId}
                    </td>

                    <td>
                      <p className="font-semibold text-gray-800">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.phone}
                      </p>
                    </td>

                    <td className="text-sm text-gray-700">
                      {order.items.map((item) => (
                        <p key={item.name}>
                          {item.name} × {item.quantity}
                        </p>
                      ))}
                    </td>

                    <td className="font-semibold text-gray-800">
                      ₹{order.total}
                    </td>

                    <td>
                      <span className="text-sm font-medium text-orange-600">
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.orderId, e.target.value)
                        }
                        className="border rounded-lg p-2 text-sm text-gray-700"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

<div className="bg-white rounded-2xl shadow-sm p-6 mt-10 overflow-x-auto">
  <h2 className="text-xl font-bold text-gray-900 mb-6">
    Table Reservations
  </h2>

  {reservations.length === 0 ? (
    <p className="text-gray-500 text-center py-8">
      No reservations available yet.
    </p>
  ) : (
    <table className="w-full text-left min-w-[750px]">
      <thead>
        <tr className="border-b text-gray-600">
          <th className="py-3">Customer</th>
          <th>Mobile</th>
          <th>Date</th>
          <th>Time</th>
          <th>Guests</th>
          <th>Status</th>
          <th>Update</th>
        </tr>
      </thead>

      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id} className="border-b">
            <td className="py-4 text-gray-800 font-medium">
              {reservation.name}
            </td>

            <td className="text-gray-700">
              {reservation.phone}
            </td>

            <td className="text-gray-700">
              {reservation.date}
            </td>

            <td className="text-gray-700">
              {reservation.time}
            </td>

            <td className="text-gray-700">
              {reservation.guests}
            </td>

            <td className="text-orange-600 font-medium">
              {reservation.status}
            </td>

            <td>
              <select
                value={reservation.status}
                onChange={(e) =>
                  updateReservationStatus(
                    reservation.id,
                    e.target.value
                  )
                }
                className="border rounded-lg p-2 text-sm text-gray-700"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        © 2026 DineDesk. All Rights Reserved.
      </footer>
    </main>
  );
}
