import express from "express";
import { customerAuth } from "../middleware/customerAuth.js";
import { createOrder, getCustomerOrders } from "../controllers/orderController.js";

const router = express.Router();

// Customer creates a new order
router.post("/", customerAuth, createOrder);

// Customer views their orders
router.get("/", customerAuth, getCustomerOrders);

export default router;