import { CategoryType } from "@types/types";
import mongoose, { Schema, Document } from "mongoose";

const categorySchema = new mongoose.Schema<CategoryType>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
