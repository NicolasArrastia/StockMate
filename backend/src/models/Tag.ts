import { TagType } from "@globalTypes/types";
import mongoose from "mongoose";

const tagSchema = new mongoose.Schema<TagType>({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true, default: "#3b82f6" },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
