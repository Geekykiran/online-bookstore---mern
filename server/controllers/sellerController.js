import Book from "../models/Book.js";

/**
 * Seed sample books (for testing/demo)
 */
export const seedBooks = async (req, res) => {
  try {
    await Book.deleteMany();
    await Book.insertMany([
      {
        title: "Programming Guide",
        author: "Robert C. Martin",
        price: 500,
        stock: 20,
        description: "A handbook of agile software craftsmanship.",
        category: "Programming",
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        price: 450,
        stock: 15,
        description: "Journey to mastery.",
        category: "Programming",
      },
      {
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        price: 300,
        stock: 30,
        description: "Deep dive into JS.",
        category: "JavaScript",
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        price: 350,
        stock: 25,
        description: "An easy & proven way to build good habits and break bad ones.",
        category: "Self-Help",
      },
    ]);

    res.status(201).send("Sample books seeded!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to seed books.");
  }
};

/**
 * Seller: Add a new book
 */
export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create book" });
  }
};

/**
 * Seller: Update book details
 */
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update book" });
  }
};

/**
 * Seller: Delete a book
 */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete book" });
  }
};

/**
 * Seller: Update stock
 */
export const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    book.stock = stock;
    await book.save();
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update stock" });
  }
};
