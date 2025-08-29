import express from "express";
import { getBooks, getBookById } from "../controllers/customerController.js";
import { createOrder, getCustomerOrders } from "../controllers/orderController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getBooks);          // GET all books (with filters)
router.get("/:id", getBookById);    // GET single book
router.post("/", authenticate, createOrder); // Place new order
router.get("/", authenticate, getCustomerOrders); // View own orders

export default router;