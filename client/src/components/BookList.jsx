import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCart } = useCart();

  // Fetch books
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(response.data.map((book) => book.category || "Others")),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Apply search + filter whenever category or search changes
  useEffect(() => {
    let updatedBooks = [...books];

    if (selectedCategory !== "All") {
      updatedBooks = updatedBooks.filter(
        (book) => (book.category || "Others") === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(updatedBooks);
  }, [selectedCategory, searchQuery, books]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Book Catalog</h2>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Book List */}
      {filteredBooks.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-1">by {book.author}</p>
              <p className="text-gray-800 font-bold mb-2">₹{book.price}</p>
              <p className="text-sm text-gray-500 mb-3">{book.description}</p>
              <p
                className={`text-sm font-medium ${
                  book.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.stock > 0
                  ? `In Stock: ${book.stock}`
                  : "Out of Stock"}
              </p>
              <p className="text-xs text-gray-400 italic">
                Category: {book.category || "Others"}
              </p>
              <button
                onClick={() => addToCart(book)}
                className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No books found matching your search/filter.
        </p>
      )}
    </div>
  );
};

export default BookList;
