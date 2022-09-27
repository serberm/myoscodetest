import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import Joi from "@hapi/joi";

export const productValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(0).max(500),
    picture: Joi.string().min(10).max(500).required(),
    price: Joi.number()
      .integer()
      .min(0)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
    quantity: Joi.number()
      .integer()
      .min(0)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
  });

  const { error } = productSchema.validate(req.body);
  if (error) return res.status(HttpStatus.BAD_REQUEST).json({ error: error.details[0].message });

  next();
};
