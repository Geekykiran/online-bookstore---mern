import Order from "../models/Order.js";
import Book from "../models/Book.js";

// Create new order (Customer)
export const createOrder = async (req, res) => {
  try {
    const { items, seller } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.book);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      if (book.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${book.title}` });
      }

      // Decrease stock
      book.stock -= item.quantity;
      await book.save();

      orderItems.push({
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      });

      totalAmount += book.price * item.quantity;
    }

    const order = new Order({
      customer: req.user.id,
      seller,
      items: orderItems,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders for customer
export const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate("items.book")
      .populate("seller", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders for seller
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id })
      .populate("items.book")
      .populate("customer", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Seller only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
