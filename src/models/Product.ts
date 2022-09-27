import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  picture: string;
}

const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 200,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    picture: {
      type: String,
      require: true,
      minlength: 10,
      maxlength: 500,
    },
    description: {
      type: String,
      require: false,
      minlength: 0,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
