import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import customerOrderRoutes from "./routes/customerOrderRoutes.js";
import sellerOrderRoutes from "./routes/sellerOrderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import customerRoutes from './routes/customerRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// base routes
app.use("/api/auth", authRoutes);
app.use("/api/seller/books", sellerRoutes);
app.use("/api/cust/books", customerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cust/orders", customerOrderRoutes);
app.use("/api/seller/orders", sellerOrderRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));