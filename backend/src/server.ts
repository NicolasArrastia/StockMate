import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.ts";
import dotenv from "dotenv";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.ts";
import tagRoutes from "./routes/tagRoutes.ts";
import morgan from "morgan";

dotenv.config();

const app = express();
connectDB();

// ! TODO: REMOVE THIS CODE BEFORE PRODUCTION
const delayMiddleware = async (req, res, next) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1001))
  ); // 2-second delay
  next();
};

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/products", delayMiddleware, productRoutes);
app.use("/api/categories", delayMiddleware, categoryRoutes);
app.use("/api/tags", delayMiddleware, tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
