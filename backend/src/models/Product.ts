import { ProductType } from "@globalTypes/types";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<ProductType>({
  name: { type: String, required: true },

  price: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  ignorePrice: { type: Boolean, required: false },

  description: { type: String },

  quantityOnStock: { type: Number, default: 0 },
  lowQuantityWarning: { type: Number, default: 0 },
  ignoreQuantity: { type: Boolean, default: false },

  code: { type: String, required: false },

  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: false,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  isActive: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
