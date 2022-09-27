import express from "express";
const router = express.Router();

//* --- Controllers ---
import  { createOrder } from "../controllers/orders";

//* --- Methods ---
// Create order
router.post("/", createOrder);

export default router;
