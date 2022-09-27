import express from "express";
const router = express.Router();

//* --- Middlewares ----
import { productValidation } from "../middleware/validation";

//* --- Controllers ---
import {createProduct, searchProducts} from "../controllers/products";

//* --- Methods ---
// Create product
router.post("/", productValidation, createProduct);

// Get all products
router.get("/", searchProducts);

export default router;
