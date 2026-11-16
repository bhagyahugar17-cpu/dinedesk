
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const foods = [
  { id: 1, name: "Cheese Pizza", price: 199 },
  { id: 2, name: "Veg Burger", price: 129 },
  { id: 3, name: "Pasta", price: 159 },
  { id: 4, name: "Veg Biryani", price: 179 },
  { id: 5, name: "French Fries", price: 99 },
  { id: 6, name: "Sandwich", price: 89 },
  { id: 7, name: "Ice Cream", price: 79 },
  { id: 8, name: "Cold Coffee", price: 99 },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("dinedesk-cart");
      setCart(savedCart ? JSON.parse(savedCart) : {});
    } catch {
      setCart({});
    }
    setLoaded(true);
  }, []);

  const cartItems = foods.filter((food) => (cart[food.id] || 0) > 0);

  const total = cartItems.reduce(
    (sum, food) => sum + food.price * cart[food.id],
    0
  );

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const order = {
      orderId: "DD" + Date.now(),
      customerName: name,
      phone,
      address,
      payment,
      items: cartItems.map((food) => ({
        name: food.name,
        price: food.price,
        quantity: cart[food.id],
      })),
      total,
      orderDate: new Date().toLocaleString(),
      status: "Confirmed",
    };

    const previousOrders = JSON.parse(
      localStorage.getItem("dinedesk-orders") || "[]"
    );

    localStorage.setItem(
      "dinedesk-orders",
      JSON.stringify([...previousOrders, order])
    );

    localStorage.setItem("dinedesk-cart", "{}");
    setCart({});
    setOrderPlaced(true);
  }

  if (!loaded) {
    return <div className="p-10 text-center">Loading checkout...</div>;
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-orange-50">
        <Navbar />
        <section className="max-w-xl mx-auto text-center py-24 px-6">
          <div className="text-7xl mb-5">🎉</div>
          <h1 className="text-3xl font-bold text-green-600">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mt-4">
            Thank you for ordering with DineDesk.
            Your order has been confirmed.
          </p>
          <Link
            href="/menu"
            className="inline-block mt-8 bg-orange-600 text-white px-7 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty!
            </h2>
            <Link
              href="/menu"
              className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form
              onSubmit={placeOrder}
              className="bg-white p-7 rounded-2xl shadow-sm space-y-5"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Details
              </h2>

              <div>
                <label className="block text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border p-3 rounded-lg text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full border p-3 rounded-lg text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete delivery address"
                  rows={4}
                  className="w-full border p-3 rounded-lg text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full border p-3 rounded-lg text-gray-900"
                >
                  <option>Cash on Delivery</option>
                  <option>UPI (Demo)</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  UPI is a demo option; no real payment is processed.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700"
              >
                Place Order
              </button>
            </form>

            <div className="bg-white p-7 rounded-2xl shadow-sm h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {cartItems.map((food) => (
                <div
                  key={food.id}
                  className="flex justify-between mb-4 text-gray-700"
                >
                  <span>
                    {food.name} × {cart[food.id]}
                  </span>
                  <span>₹{food.price * cart[food.id]}</span>
                </div>
              ))}

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-orange-600">₹{total}</span>
              </div>

              <Link
                href="/cart"
                className="block text-center text-orange-600 mt-6"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
