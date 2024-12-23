import { Request, Response } from "express";
import Sale from "../models/Sale";
import { SaleType } from "@globalTypes/types";
import Product from "src/models/Product";

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales" });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      res.status(404).json({ error: "Sale not found" });
      return;
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sale" });
  }
};

export const createSale = async (
  req: Request<{}, {}, SaleType>,
  res: Response
) => {
  try {
    const { products } = req.body;

    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const sale = new Sale<SaleType>({
      ...req.body,
      totalAmount,
    });

    const updatePromises = req.body.products.map(async (product) => {
      const foundProduct = await Product.findById(product.id);
      if (!foundProduct) {
        throw new Error(`Producto con ID ${product.id} no encontrado`);
      }
      if (foundProduct.quantityOnStock < product.quantity) {
        throw new Error(
          `No hay suficiente stock para el producto con ID ${product.id}`
        );
      }
      foundProduct.quantityOnStock -= product.quantity;
      await foundProduct.save();
    });

    await Promise.all(updatePromises);
    const savedSale = await sale.save();

    res.status(201).json(savedSale);
  } catch (error) {
    res.status(500).json({ message: "Error creating sale", error });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSale) {
      res.status(404).json({ error: "Sale not found" });
      return;
    }
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: "Error updating sale" });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) {
      res.status(404).json({ error: "Sale not found" });
      return;
    }
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting sale" });
  }
};
