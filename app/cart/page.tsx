
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";


const foods = [
  { id: 1, name: "Cheese Pizza", price: 199, emoji: "🍕" },
  { id: 2, name: "Veg Burger", price: 129, emoji: "🍔" },
  { id: 3, name: "Pasta", price: 159, emoji: "🍝" },
  { id: 4, name: "Veg Biryani", price: 179, emoji: "🍛" },
  { id: 5, name: "French Fries", price: 99, emoji: "🍟" },
  { id: 6, name: "Sandwich", price: 89, emoji: "🥪" },
  { id: 7, name: "Ice Cream", price: 79, emoji: "🍨" },
  { id: 8, name: "Cold Coffee", price: 99, emoji: "🥤" },
  { id: 9, name: "Paneer Pizza", price: 249, emoji: "🍕" },
  { id: 10, name: "Paneer Biryani", price: 219, emoji: "🍛" },
  { id: 11, name: "Veg Momos", price: 99, emoji: "🥟" },
  { id: 12, name: "Masala Dosa", price: 89, emoji: "🥞" },
  { id: 13, name: "Gulab Jamun", price: 69, emoji: "🍮" },
  { id: 14, name: "Mango Shake", price: 119, emoji: "🥭" },
];


export default function CartPage() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  try {
    const savedCart = localStorage.getItem("dinedesk-cart");
   
    setCart(savedCart ? JSON.parse(savedCart) : {});
  } catch {
    setCart({});
  }

  setLoaded(true);
}, []);

useEffect(() => {
  if (loaded) {
    localStorage.setItem("dinedesk-cart", JSON.stringify(cart));
  }
}, [cart, loaded]);

  function updateQuantity(id: number, change: number) {
    setCart((previous) => {
      const updated = { ...previous };
      const quantity = (updated[id] || 0) + change;

      if (quantity <= 0) {
        delete updated[id];
      } else {
        updated[id] = quantity;
      }

      return updated;
    });
  }

  function removeItem(id: number) {
    setCart((previous) => {
      const updated = { ...previous };
      delete updated[id];
      return updated;
    });
  }

  const cartItems = foods.filter((food) => (cart[food.id] || 0) > 0);

  const total = cartItems.reduce(
    (sum, food) => sum + food.price * cart[food.id],
    0
  );

  const totalItems = cartItems.reduce(
    (sum, food) => sum + cart[food.id],
    0
  );

  if (!loaded) {
    return <div className="p-10 text-center">Loading cart...</div>;
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">
          My Shopping Cart
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Review your selected delicious food.
        </p>
       
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-7xl mb-5">🛒</div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty!
            </h2>

            <p className="text-gray-500 mt-3 mb-7">
              Add some delicious food to your cart.
            </p>

            <Link
              href="/menu"
              className="bg-orange-600 text-white px-7 py-3 rounded-lg"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((food) => (
                <div
                  key={food.id}
                  className="bg-white p-5 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{food.emoji}</span>

                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {food.name}
                      </h3>
                      <p className="text-orange-600 font-semibold">
                        ₹{food.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(food.id, -1)}
                      className="bg-gray-200 px-3 py-2 rounded-lg"
                    >
                      -
                    </button>

                    <span className="font-bold text-gray-900">
                      {cart[food.id]}
                    </span>

                    <button
                      onClick={() => updateQuantity(food.id, 1)}
                      className="bg-orange-600 text-white px-3 py-2 rounded-lg"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(food.id)}
                      className="text-red-600 ml-2"
                    >
                      🗑️
                    </button>
                  </div>

                  <p className="font-bold text-gray-900">
                    ₹{food.price * cart[food.id]}
                  </p>
                </div>
              ))}

              <Link
                href="/menu"
                className="inline-block text-orange-600 font-semibold mt-4"
              >
                ← Continue Shopping
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between mb-5 text-gray-600">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <hr className="mb-5" />

              <div className="flex justify-between font-bold text-xl mb-7">
                <span>Total</span>
                <span className="text-orange-600">₹{total}</span>
              </div>
<Link
  href="/checkout"
  className="block text-center w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700"
>
  Proceed to Checkout
</Link>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        © 2026 DineDesk. All Rights Reserved.
      </footer>
    </main>
  );
}
