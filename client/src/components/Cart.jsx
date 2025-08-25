import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user, token } = useAuth();
  const { cartItems, removeFromCart, clearCart, message } = useCart();
  const navigate = useNavigate(); // ✅ you missed this line

  useEffect(() => {
    if (!user) {
      navigate("/login"); // 🔥 redirect to login page
    }
  }, [user, navigate]);

  if (!user) {
    return null; // or a spinner / message
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: cartItems.map(item => ({
          bookId: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {message && (
              <div className="p-2 bg-green-100 border border-green-400 text-green-800 rounded mb-4">
                {message}
              </div>
            )}
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Clear Saved Cart
          </button>
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold mb-2">Total: ₹{total}</h3>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
