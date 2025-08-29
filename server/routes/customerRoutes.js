import express from "express";
import { getBooks, getBookById } from "../controllers/customerController.js";
import { createOrder, getCustomerOrders } from "../controllers/orderController.js";
import { customerAuth } from "../middleware/customerAuth.js";

const router = express.Router();


router.get("/", getBooks);          // GET all books (with filters)
router.get("/:id", getBookById);    // GET single book
router.post("/", customerAuth, createOrder); // Place new order
router.get("/", customerAuth, getCustomerOrders); // View own orders

export default router;