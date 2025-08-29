import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import { customerAuth } from "../middleware/customerAuth.js";

const router = express.Router();

router.post("/add", customerAuth, addToCart);
router.get("/", customerAuth, getCart);
router.delete("/remove/:bookId", customerAuth, removeFromCart);
router.delete("/clear", customerAuth, clearCart);

export default router;