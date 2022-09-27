import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { SortOrder } from "mongoose";
//* --- Models ---
import Product, { IProduct } from "../models/Product";

//* --- Methods ---
// Create product
export const createProduct = async (req: Request, res: Response) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const picture = req.body.picture;

  // Create a new Product
  const product = new Product({
    title: title,
    price: price,
    description: description,
    quantity: quantity,
    picture: picture,
  });

  // Save product
  try {
    const savedProduct = await product.save();
    return res.status(HttpStatus.CREATED).json({
      message: "Product successfully created.",
      product: {
        _id: savedProduct._id,
        title: savedProduct.title,
        price: savedProduct.price,
        description: savedProduct.description,
        quantity: savedProduct.quantity,
        picture: savedProduct.picture,
      },
    });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};

// Get all products
export const searchProducts = async (req: Request, res: Response) => {
  // Get all products
  try {
    const searchQuery = {
      $or: [
        { title: { $regex: req.query.search || "", $options: "i" } },
        { description: { $regex: req.query.search || "", $options: "i" } },
      ],
    };
    const sort = (req.query.sort || "asc") as SortOrder;
    let docs: Array<IProduct> = [];

    docs = await Product.find(searchQuery).sort({ price: sort });

    // Return all products
    return res.status(HttpStatus.OK).json({
      total: docs.length,
      products: docs.map((product) => {
        return {
          _id: product._id,
          title: product.title,
          price: product.price,
          description: product.description,
          picture: product.picture,
          quantity: product.quantity,
        };
      }),
    });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};
