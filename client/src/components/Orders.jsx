import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { token, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login"); // 🚀 redirect if not logged in
            return;
        }

        axios.get("http://localhost:5000/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setOrders(res.data))
        .catch(err => console.error("Error fetching orders:", err));
    }, [token, user, navigate]);

    if (!user) return null; // avoid flicker

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">All Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders placed yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-4 rounded shadow">
                            <p className="text-sm text-gray-500 mb-2">
                                Order Date: {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <ul className="mb-2">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="flex justify-between border-b py-1">
                                        <span>{item.title} x {item.quantity}</span>
                                        <span className="font-bold">₹{item.price * item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-right font-semibold">Total: ₹{order.total}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
