import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // Para parsear JSON
app.use("/api/products", productRoutes); // Rutas de productos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
