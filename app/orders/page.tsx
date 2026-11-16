
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("dinedesk-orders");
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch {
      setOrders([]);
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="p-10 text-center">Loading orders...</div>;
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          My Orders
        </h1>

        <p className="text-center text-gray-600 mt-3 mb-10">
          View your previous food orders.
        </p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-7xl mb-5">📦</div>

            <h2 className="text-2xl font-bold text-gray-900">
              No orders yet!
            </h2>

            <p className="text-gray-500 mt-3 mb-7">
              Your placed orders will appear here.
            </p>

            <Link
              href="/menu"
              className="bg-orange-600 text-white px-7 py-3 rounded-lg"
            >
              Order Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.slice().reverse().map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-wrap justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Order #{order.orderId}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                      {order.orderDate}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full h-fit">
                    {order.status}
                  </span>
                </div>

                <hr className="mb-5" />

                <h3 className="font-bold text-gray-900 mb-3">
                  Ordered Items
                </h3>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-700 mb-3"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

                <hr className="my-5" />

                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Customer:</strong> {order.customerName}
                  </p>

                  <p>
                    <strong>Mobile:</strong> {order.phone}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>

                  <p>
                    <strong>Payment:</strong> {order.payment}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="font-bold text-lg text-gray-900">
                    Total Amount
                  </span>

                  <span className="font-bold text-2xl text-orange-600">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        © 2026 DineDesk. All Rights Reserved.
      </footer>
    </main>
  );
}
