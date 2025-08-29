import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authenticate, addToCart);
router.get("/", authenticate, getCart);
router.delete("/remove/:bookId", authenticate, removeFromCart);
router.delete("/clear", authenticate, clearCart);

export default router;