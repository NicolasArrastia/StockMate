import { Request, Response } from "express";
import Category from "../models/Category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, description, parent } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res
        .status(400)
        .json({ message: "Category with this name already exists" });
      return;
    }

    const newCategory = new Category({
      name,
      description,
      parent: parent || null,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, parent } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, parent },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
