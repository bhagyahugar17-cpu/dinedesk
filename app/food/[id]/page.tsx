
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

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
 type Review = {
  name: string;
  rating: number;
  comment: string;
  date: string;
};
export default function FoodDetailsPage() {
    
   
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState("");
const [reviewText, setReviewText] = useState("");
const [rating, setRating] = useState(5);
const [reviews, setReviews] = useState<Review[]>([]);

  const food = foods.find(
    (item) => item.id === Number(params.id)
  );
useEffect(() => {
  const savedReviews = localStorage.getItem(
    `dinedesk-reviews-${params.id}`
  );

  if (savedReviews) {
    try {
      setReviews(JSON.parse(savedReviews));
    } catch {
      setReviews([]);
    }
  } else {
    setReviews([]);
  }
}, [params.id]);
function submitReview() {
  if (!reviewName.trim() || !reviewText.trim()) {
    alert("Please enter your name and review.");
    return;
  }

  if (!food) return;

  const newReview: Review = {
    name: reviewName.trim(),
    rating,
    comment: reviewText.trim(),
    date: new Date().toLocaleDateString(),
  };

  const updatedReviews = [...reviews, newReview];

  setReviews(updatedReviews);

  localStorage.setItem(
    `dinedesk-reviews-${food.id}`,
    JSON.stringify(updatedReviews)
  );

  setReviewName("");
  setReviewText("");
  setRating(5);

  alert("Thank you! Your review has been submitted.");
}
  function addToCart() {
    if (!food) return;

    const cart = JSON.parse(
      localStorage.getItem("dinedesk-cart") || "{}"
    );

    cart[food.id] = (cart[food.id] || 0) + quantity;

    localStorage.setItem("dinedesk-cart", JSON.stringify(cart));

    alert("Food added to cart successfully!");
  }

  if (!food) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Food Not Found</h1>
          <Link
            href="/menu"
            className="text-orange-600 underline mt-5 inline-block"
          >
            Back to Menu
          </Link>
        </div>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">

          <img
            src={food.image}
            alt={food.name}
            className="w-full h-80 object-cover rounded-2xl mb-8"
          />

          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
            {food.category}
          </span>

          <h1 className="text-4xl font-bold text-gray-900 mt-6">
            {food.name}
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            {food.description}
          </p>

          <p className="text-3xl font-bold text-orange-600 mt-6">
            ₹{food.price}
          </p>

          <div className="flex justify-center items-center gap-5 mt-8">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-5 py-2 rounded-lg text-xl"
            >
              -
            </button>

            <span className="text-xl font-bold">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-orange-600 text-white px-5 py-2 rounded-lg text-xl"
            >
              +
            </button>
          </div>

          <p className="text-xl font-bold mt-6">
            Total: ₹{food.price * quantity}
          </p>

          <button
            onClick={addToCart}
            className="bg-orange-600 text-white px-8 py-3 rounded-xl mt-6 hover:bg-orange-700"
          >
            Add to Cart
          </button>
        
{/* Customer Reviews Section */}
<div className="mt-12 border-t pt-8 text-left">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">
    Customer Reviews ⭐
  </h2>

  <div className="bg-orange-50 p-6 rounded-xl mb-8">
    <h3 className="text-lg font-semibold mb-4">
      Write Your Review
    </h3>

    <input
      type="text"
      placeholder="Enter your name"
      value={reviewName}
      onChange={(e) => setReviewName(e.target.value)}
      className="w-full border rounded-lg p-3 mb-4"
    />

    <p className="font-medium mb-2">Give your rating:</p>

    <div className="flex gap-2 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-3xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>

    <textarea
      placeholder="Write your feedback..."
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      className="w-full border rounded-lg p-3 mb-4"
      rows={4}
    />

    <button
      onClick={submitReview}
      className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
    >
      Submit Review
    </button>
  </div>

  <h3 className="text-xl font-bold mb-4">
    Customer Feedback ({reviews.length})
  </h3>

  {reviews.length === 0 ? (
    <p className="text-gray-500">
      No reviews yet. Be the first to review!
    </p>
  ) : (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border rounded-xl p-5 bg-white"
        >
          <div className="flex justify-between flex-wrap gap-2">
            <h4 className="font-bold text-gray-900">
              {review.name}
            </h4>
            <span className="text-sm text-gray-500">
              {review.date}
            </span>
          </div>

          <p className="text-yellow-500 text-xl mt-2">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </p>

          <p className="text-gray-600 mt-2">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

          <div className="mt-6">
            <Link
              href="/menu"
              className="text-orange-600 hover:underline"
            >
              ← Back to Menu
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
