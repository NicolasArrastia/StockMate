import { Request, Response } from "express";
import Product from "../models/Product.js";
// TODO: fix this import
import { ProductType } from "@types/types.ts";
import { FilterQuery } from "mongoose";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.query;

    const filter: FilterQuery<ProductType> = {};
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).populate("category");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price, description } = req.body;

  const newProduct = new Product({
    name,
    price,
    description,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting product", error });
  }
};
