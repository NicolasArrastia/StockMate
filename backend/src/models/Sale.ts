import {
  PaymentMethodsEnum,
  SaleStatusEnum,
  SaleType,
} from "@globalTypes/types";
import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema<SaleType>({
  date: { type: Date, default: Date.now },
  // customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },

  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],

  totalAmount: { type: Number, required: true },
  totalDiscount: { type: Number, required: true },

  paymentMethod: { type: String, required: true, enum: PaymentMethodsEnum },
  status: { type: String, required: true, enum: SaleStatusEnum },
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Sale = mongoose.model<SaleType>("Sale", SaleSchema);
export default Sale;
