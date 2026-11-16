
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const foods = [
  {
    id: 1,
    name: "Cheese Pizza",
    category: "Pizza",
    price: 199,
    emoji: "🍕",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    description: "Cheesy pizza with fresh toppings",
  },
  {
    id: 2,
    name: "Veg Burger",
    category: "Burger",
    price: 129,
    emoji: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    description: "Fresh vegetables and crispy patty",
  },
  {
    id: 3,
    name: "Pasta",
    category: "Pasta",
    price: 159,
    emoji: "🍝",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600",
    description: "Creamy pasta with delicious sauce",
  },
  {
    id: 4,
    name: "Veg Biryani",
    category: "Rice",
    price: 179,
    emoji: "🍛",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
    description: "Authentic vegetable biryani",
  },
  {
    id: 5,
    name: "French Fries",
    category: "Snacks",
    price: 99,
    emoji: "🍟",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
    description: "Crispy golden potato fries",
  },
  {
    id: 6,
    name: "Sandwich",
    category: "Snacks",
    price: 89,
    emoji: "🥪",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
    description: "Fresh and healthy sandwich",
  },
  {
    id: 7,
    name: "Ice Cream",
    category: "Dessert",
    price: 79,
    emoji: "🍨",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600",
    description: "Delicious creamy ice cream",
  },
  {
    id: 8,
    name: "Cold Coffee",
    category: "Drinks",
    price: 99,
    emoji: "🥤",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    description: "Refreshing chilled coffee",
  },

  {
    id: 9,
    name: "Paneer Pizza",
    category: "Pizza",
    price: 249,
    emoji: "🍕",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
    description: "Delicious pizza topped with paneer and cheese",
  },
  {
    id: 10,
    name: "Paneer Biryani",
    category: "Rice",
    price: 219,
    emoji: "🍛",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
    description: "Flavorful biryani with spicy paneer",
  },
  {
    id: 11,
    name: "Veg Momos",
    category: "Snacks",
    price: 99,
    emoji: "🥟",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600",
    description: "Steamed vegetable momos with spicy chutney",
  },
  {
    id: 12,
    name: "Masala Dosa",
    category: "Snacks",
    price: 89,
    emoji: "🥞",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600",
    description: "Crispy dosa filled with potato masala",
  },
  {
    id: 13,
    name: "Gulab Jamun",
    category: "Dessert",
    price: 69,
    emoji: "🍮",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gulabjamuns.jpg?width=600",
    description: "Soft and sweet gulab jamun",
  },
  {
    id: 14,
    name: "Mango Shake",
    category: "Drinks",
    price: 119,
    emoji: "🥭",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600",
    description: "Refreshing creamy mango milkshake",
  },

];

const categories = [
  "All", "Pizza", "Burger", "Pasta", "Rice", "Snacks", "Dessert", "Drinks"
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");


const [cart, setCart] = useState<{ [key: number]: number }>({});
const [cartLoaded, setCartLoaded] = useState(false);

// Load saved cart when the page opens
useEffect(() => {
  try {
    const savedCart = localStorage.getItem("dinedesk-cart");
    setCart(savedCart ? JSON.parse(savedCart) : {});
  } catch {
    setCart({});
  }

  setCartLoaded(true);
}, []);

// Save cart only after loading is complete
useEffect(() => {
  if (cartLoaded) {
    localStorage.setItem("dinedesk-cart", JSON.stringify(cart));
  }
}, [cart, cartLoaded]);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || food.category === category;
    return matchesSearch && matchesCategory;
  });

  function addToCart(id: number) {
    setCart((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
  }
// Decrease item quantity
function decreaseFromCart(id: number) {
  setCart((previous) => {
    const updated = { ...previous };

    if (updated[id] > 1) {
      updated[id] -= 1;
    } else {
      delete updated[id];
    }

    return updated;
  });
}

// Completely remove item from cart
function removeFromCart(id: number) {
  setCart((previous) => {
    const updated = { ...previous };
    delete updated[id];
    return updated;
  });
}
  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="text-center py-12 px-5">
        <h1 className="text-4xl font-bold text-gray-900">
          Explore Our Menu
        </h1>
        <p className="text-gray-600 mt-3">
          Find your favourite food and order now!
        </p>

        <div className="mt-7 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search your favourite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-6 py-3 outline-none focus:border-orange-500 text-gray-900"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full font-medium ${
                category === item
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Foods
          </h2>
          <p className="text-orange-600 font-semibold">
            Cart: {cartCount} items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
             <div className="w-full h-48 overflow-hidden rounded-xl mb-5">
  <img
    src={food.image}
    alt={food.name}
    className="w-full h-full object-cover hover:scale-110 transition duration-300"
  />
</div>

              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                {food.category}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mt-4">
                {food.name}
              </h3>
<Link
  href={`/food/${food.id}`}
  className="inline-block text-orange-600 text-sm font-semibold mt-3 hover:underline"
>
  View Details →
</Link>
              <p className="text-gray-500 text-sm mt-2">
                {food.description}
              </p>

              <div className="flex justify-between items-center mt-5">
                <span className="text-xl font-bold text-orange-600">
                  ₹{food.price}
                </span>

                {cart[food.id] > 0 ? (
  <div className="flex items-center gap-2">

    <button
      onClick={() => decreaseFromCart(food.id)}
      className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg"
    >
      -
    </button>

    <span className="font-bold text-gray-900">
      {cart[food.id]}
    </span>

    <button
      onClick={() => addToCart(food.id)}
      className="bg-orange-600 text-white px-3 py-2 rounded-lg"
    >
      +
    </button>

    <button
      onClick={() => removeFromCart(food.id)}
      className="text-red-600 px-2 py-2 rounded-lg hover:bg-red-50"
      title="Remove item"
    >
      🗑️
    </button>

  </div>
) : (
  <button
    onClick={() => addToCart(food.id)}
    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
  >
    Add +
  </button>
)}
              </div>

              {cart[food.id] > 0 && (
                <p className="text-green-600 text-sm mt-3">
                  Added: {cart[food.id]}
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No food items found. Try another search.
          </p>
        )}
      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        © 2026 DineDesk. All Rights Reserved.
      </footer>
    </main>
  );
}
