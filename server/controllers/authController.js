import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Seller from "../models/Seller.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";


export const register = async (req, res) => {
    try {
        const { role, name, email, password, address, shopName } = req.body;

        if (!role || !["customer", "seller"].includes(role)) {
            return res.status(400).json({ error: "Role must be customer or seller" });
        }

        const existing =
            role === "customer"
                ? await Customer.findOne({ email })
                : await Seller.findOne({ email });

        if (existing) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        if (role === "customer") {
            user = await Customer.create({
                name,
                email,
                password: hashedPassword,
                address,
            });
        } else {
            user = await Seller.create({
                name,
                email,
                password: hashedPassword,
                shopName,
            });
        }

        res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
};


export const login = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        if (!role || !["customer", "seller"].includes(role)) {
            return res.status(400).json({ error: "Role must be customer or seller" });
        }

        const user =
            role === "customer"
                ? await Customer.findOne({ email })
                : await Seller.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
};
