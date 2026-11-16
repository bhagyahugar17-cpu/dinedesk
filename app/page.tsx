
import Navbar from "./components/Navbar";

const foods = [
  {
    name: "Cheese Pizza",
    description: "Delicious cheesy pizza with fresh toppings",
    price: "₹199",
    emoji: "🍕",
  },
  {
    name: "Veg Burger",
    description: "Fresh vegetables with crispy burger patty",
    price: "₹129",
    emoji: "🍔",
  },
  {
    name: "Pasta",
    description: "Creamy pasta with delicious sauce",
    price: "₹159",
    emoji: "🍝",
  },
  {
    name: "Biryani",
    description: "Authentic aromatic vegetable biryani",
    price: "₹179",
    emoji: "🍛",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="px-8 py-20 text-center">
        <p className="text-orange-600 font-semibold mb-4">
          WELCOME TO DINEDESK
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Delicious Food,
          <br />
          Delivered To You!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Order your favourite food online and enjoy
          delicious meals at your comfort.
        </p>

        <a
          href="/menu"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700"
        >
          Explore Menu
        </a>
      </section>

      <section className="px-8 py-12 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Popular Foods
          </h2>
          <p className="text-gray-500 mt-2">
            Choose your favourite delicious meal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {foods.map((food) => (
            <div
              key={food.name}
              className="bg-orange-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition"
            >
              <div className="text-7xl mb-5">
                {food.emoji}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {food.name}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {food.description}
              </p>

              <div className="flex justify-between items-center mt-5">
                <span className="text-orange-600 font-bold text-lg">
                  {food.price}
                </span>

                <a
                  href="/menu"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-14 px-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Good Food, Great Moments!
        </h2>

        <p className="text-gray-600 mt-4">
          Fresh food, easy ordering and a wonderful dining experience.
        </p>
      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        <p>© 2026 DineDesk. All Rights Reserved.</p>
        <p className="text-gray-400 text-sm mt-2">
          Delicious Food, Happy Customers!
        </p>
      </footer>
    </main>
  );
}
