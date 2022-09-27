import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Order from "../models/Order";

//* --- Methods ---
// Create order
export const createOrder = async (req: Request, res: Response) => {
    // Create a new order
    const order = new Order();
    const productIds = req.body.productIds;
    // Save order
    try {
        const savedOrder = await order.save();
        // Add product to order
    
      await Order.updateOne({ _id: savedOrder._id }, { products: productIds });
      
      return res.status(HttpStatus.OK).json({
          message: "Order successfully created.",
          createdOrder: {
              _id: savedOrder._id,
          },
      });
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
