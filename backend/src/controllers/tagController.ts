import { Request, Response } from "express";
import Tag from "../models/Tag";
import { FilterQuery } from "mongoose";
import { TagType } from "@globalTypes/types";

export const getAllTags = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { search } = req.query;

    const filter: FilterQuery<TagType> = {};
    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    const tags = await Tag.find(filter);
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags", error });
  }
};

export const getTagById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching tag", error });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res
        .status(400)
        .json({ message: "Tag with this name already exists" });
    }

    const newTag = new Tag({ name });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: "Error creating tag", error });
  }
};

export const updateTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      { name, color },
      { new: true, runValidators: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    return res.status(200).json(updatedTag);
  } catch (error) {
    return res.status(500).json({ message: "Error updating tag", error });
  }
};

export const deleteTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedTag = await Tag.findByIdAndDelete(id);

    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    return res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting tag", error });
  }
};
