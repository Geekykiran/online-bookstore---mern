import express from "express";
import {
    seedBooks,
    createBook,
    updateBook,
    deleteBook,
    updateStock,
} from "../controllers/sellerController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Seller Routes (protected with auth)
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("seller"),
    createBook
);

router.put(
    "/:id",
    authenticate,
    authorizeRoles("seller"),
    updateBook
);

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("seller"),
    deleteBook
);

router.patch(
    "/:id/stock",
    authenticate,
    authorizeRoles("seller"),
    updateStock
);

router.post(
    "/seed",
    authenticate,
    authorizeRoles("seller"),
    seedBooks
);

export default router;
