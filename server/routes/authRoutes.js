import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// for both seller and customer
router.post("/register", register);
router.post("/login", login);

export default router;
