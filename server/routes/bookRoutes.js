import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

router.get("/seed-books", async (req, res) => {
  try {
    await Book.deleteMany();
    await Book.insertMany([
      { title: "Clean Code", author: "Robert C. Martin", price: 500, stock: 20, description: "A handbook of agile software craftsmanship." },
      { title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 450, stock: 15, description: "Journey to mastery." },
      { title: "You Don't Know JS", author: "Kyle Simpson", price: 300, stock: 30, description: "Deep dive into JS." }
    ]);
    res.send("Sample books seeded!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to seed books.");
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch books." });
  }
});

export default router;
