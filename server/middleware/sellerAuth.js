// middlewares/sellerAuth.js
import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

export const sellerAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Seller.findById(decoded.id);

    if (!user || user.role !== "seller") {
      return res.status(403).json({ error: "Access denied, sellers only" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
