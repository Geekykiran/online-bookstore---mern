import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from 'axios'

const BookList = () => {
    // console.log("useCart:", useCart());
    const [books, setBooks] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get("http://localhost:5000/api/books")
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error fetching books:", error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Book Catalog</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map(book => (
                    <div key={book._id} className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                        <p className="text-gray-600 mb-1">by {book.author}</p>
                        <p className="text-gray-800 font-bold mb-2">₹{book.price}</p>
                        <p className="text-sm text-gray-500 mb-3">{book.description}</p>
                        <p className={`text-sm font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {book.stock > 0 ? `In Stock: ${book.stock}` : 'Out of Stock'}
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
        </div>
    );
};

export default BookList;