import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  _id: { type: string },
  products: Array<string>;
}

const OrderSchema: Schema = new Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
