import { ProductType } from "@types/types";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<ProductType>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  quantityOnStock: { type: Number, default: 0 },
  lowQuantityWarning: { type: Number, default: 0 },
  code: { type: String, required: false },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
