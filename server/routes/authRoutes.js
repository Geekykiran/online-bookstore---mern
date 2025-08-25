import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from 'bcrypt'

const router = express.Router();

// =======================
// @route   POST /api/auth/register
// @desc    Register new user
// =======================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// =======================
// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Sign JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
