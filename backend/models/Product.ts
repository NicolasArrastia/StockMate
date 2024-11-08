import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  quantityOnStock: { type: Number, default: 0 },
  quantityLowWarning: { type: Number, default: 0 },
  code: { type: String, required: true },

  // category
  // tags
});

const Product = mongoose.model("Product", productSchema);
export default Product;
