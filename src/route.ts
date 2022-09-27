import express from "express";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";

const router = express.Router();
// Routes
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;
