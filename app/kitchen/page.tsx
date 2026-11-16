
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

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("dinedesk-orders");

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    }

    setLoaded(true);
  }, []);

  
const updateStatus = (orderId: string, newStatus: string) => {
  try {
    const savedOrders = localStorage.getItem("dinedesk-orders");

    const currentOrders: Order[] = savedOrders
      ? JSON.parse(savedOrders)
      : orders;

    const updatedOrders = currentOrders.map((order) =>
      order.orderId === orderId
        ? { ...order, status: newStatus }
        : order
    );

    localStorage.setItem(
      "dinedesk-orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);

  } catch (error) {
    console.error("Unable to update order status:", error);
    alert("Something went wrong while updating the order.");
  }
};

  const activeOrders = orders.filter(
    (order) =>
      order.status === "Confirmed" ||
      order.status === "Preparing"
  );

  const completedOrders = orders.filter(
    (order) =>
      order.status === "Out for Delivery" ||
      order.status === "Delivered"
  );

  if (!loaded) {
    return <div className="p-10 text-center">Loading Kitchen Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Kitchen Dashboard 👨‍🍳
            </h1>
            <p className="text-gray-500 mt-2">
              Manage and prepare customer orders.
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="bg-orange-600 text-white px-5 py-3 rounded-lg hover:bg-orange-700"
          >
            Refresh Orders
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {orders.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Active Orders</p>
            <h2 className="text-3xl font-bold text-orange-600 mt-2">
              {activeOrders.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Ready / Completed</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {completedOrders.length}
            </h2>
          </div>

        </div>

        {/* Active Orders */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Incoming Kitchen Orders 🍽️
        </h2>

        {activeOrders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center shadow-sm mb-10">
            <p className="text-5xl mb-3">🍽️</p>
            <h3 className="text-xl font-semibold text-gray-700">
              No Active Orders
            </h3>
            <p className="text-gray-500 mt-2">
              New customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {activeOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500"
              >
                <div className="flex justify-between items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Order #{order.orderId}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.orderDate}
                    </p>
                  </div>

                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-b py-4 my-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Food Items
                  </h4>

                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 text-gray-600"
                    >
                      <span>{item.name}</span>
                      <span className="font-semibold">
                        x {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Customer:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.payment}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    Total: ₹{order.total}
                  </p>
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Update Order Status
                  </label>

                  <select
                    value={order.status}
                    onChange={(e) =>
  updateStatus(order.orderId, e.target.value)
}         
className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed / Dispatched Orders */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Dispatched & Delivered Orders 🚚
        </h2>

        {completedOrders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center shadow-sm">
            <p className="text-gray-500">
              No dispatched or delivered orders yet.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {completedOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-t text-gray-700"
                  >
                    <td className="p-4 font-semibold">
                      {order.orderId}
                    </td>
                    <td className="p-4">
                      {order.customerName}
                    </td>
                    <td className="p-4">₹{order.total}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
