import express from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tagController";

const router = express.Router();

router.get("/", getAllTags);
router.get("/:id", getTagById);
router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
