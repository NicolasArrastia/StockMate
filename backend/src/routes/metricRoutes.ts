import express from "express";
import {
  getLowStockCount,
  getOutOfStockCount,
} from "src/controllers/metricController";

const router = express.Router();

router.get("/low-stock", getLowStockCount);
router.get("/out-of-stock", getOutOfStockCount);

export default router;
