import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [message, setMessage] = useState("");

  // 🚀 Load cart from DB when user logs in
  useEffect(() => {
    if (token && user) {
      axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setCartItems(res.data || []))
      .catch(err => console.error("Failed to load cart:", err));
    } else {
      setCartItems([]);
    }
  }, [token, user]);

  // 🚀 Save cart to localStorage + DB
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    if (token) {
      axios.post("http://localhost:5000/api/cart", { items: cartItems }, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(err => console.error("Failed to save cart:", err));
    }

    if (cartItems.length) {
      setMessage("Cart saved locally.");
      const timeout = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timeout);
    }
  }, [cartItems, token]);

  const addToCart = (book) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === book._id);
      if (existing) {
        return prev.map(item =>
          item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item._id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, message, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
