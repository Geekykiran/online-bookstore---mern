import express from "express";
import {
    seedBooks,
    createBook,
    updateBook,
    deleteBook,
    updateStock,
} from "../controllers/sellerController.js";
import { sellerAuth } from "../middleware/sellerAuth.js";

const router = express.Router();

/**
 * Seller Routes (protected with auth)
 */
router.post(
    "/",
    sellerAuth,
    createBook
);

router.put(
    "/:id",
    sellerAuth,
    updateBook
);

router.delete(
    "/:id",
    sellerAuth,
    deleteBook
);

router.patch(
    "/:id/stock",
    sellerAuth,
    updateStock
);

router.post(
    "/seed",
    sellerAuth,
    seedBooks
);

export default router;
