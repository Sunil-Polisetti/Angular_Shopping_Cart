require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "https://angular-shopping-cart-taupe.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* ================= DATABASE ================= */
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shoppingcart";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

/* ================= ROUTE IMPORTS ================= */
const productRoutes = require("./Product API Routes.js");
const orderRoutes = require("./Order.js");
const authRoutes = require("./User Authentication.js");

/* ================= API ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.json({ message: "Shopping Cart API running ✅" });
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
