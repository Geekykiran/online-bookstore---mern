import express from "express";
import { sellerAuth } from '../middleware/sellerAuth.js'
import { getSellerOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

// Seller views all their orders
router.get("/", sellerAuth, getSellerOrders);

// Seller updates order status (e.g., "Processing", "Shipped", "Delivered")
router.put("/:id/status", sellerAuth, updateOrderStatus);

export default router;
