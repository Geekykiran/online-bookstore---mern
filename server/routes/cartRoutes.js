import express from "express";
import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🛒 GET user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    res.json(cart ? cart.items : []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching cart" });
  }
});

// 🛒 POST/UPDATE user cart
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ userId: req.user.userId, items });
      await cart.save();
    }

    res.json({ message: "Cart saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error saving cart" });
  }
});

export default router;
