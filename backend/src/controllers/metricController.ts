import { ProductType } from "@globalTypes/types";
import { Response, Request } from "express";
import Product from "src/models/Product";

export const getLowStockCount = async (req: Request, res: Response) => {
  try {
    // TODO: move this to service layer
    const lowStockCount = await Product.countDocuments({
      $expr: {
        $lte: ["$quantityOnStock", "$lowQuantityWarning"],
      },
    });
    res.status(200).json({ lowStockCount });
  } catch (error) {
    res.status(500).json({ error: "Error fetching low stock count" });
  }
};

export const getOutOfStockCount = async (req: Request, res: Response) => {
  try {
    // TODO: move this to service layer
    const outOfStockCount = await Product.countDocuments({
      $expr: {
        $lte: ["$quantityOnStock", 0],
      },
    });
    res.status(200).json({ outOfStockCount });
  } catch (error) {
    res.status(500).json({ error: "Error fetching low stock count" });
  }
};
