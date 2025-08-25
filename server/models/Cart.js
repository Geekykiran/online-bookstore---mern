import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      title: String,
      price: Number,
      quantity: Number
    }
  ]
});

export default mongoose.model("Cart", cartSchema);
