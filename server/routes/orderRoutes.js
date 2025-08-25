import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Place order (authenticated)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || !total) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      userId: req.user.userId,
      items,
      total
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order." });
  }
});

// Get orders for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

export default router;
