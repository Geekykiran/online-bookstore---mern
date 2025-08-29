// middlewares/customerAuth.js
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

export const customerAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Customer.findById(decoded.id);

    if (!user || user.role !== "customer") {
      return res.status(403).json({ error: "Access denied, customers only" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
