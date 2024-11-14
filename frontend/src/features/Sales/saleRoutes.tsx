import { RouteType } from "../../types";
import AllSales from "./pages/AllSales";
import NewSale from "./pages/NewSale";
import SaleDetails from "./pages/SaleDetails";

export const saleRoutes: RouteType[] = [
  { path: "/", element: <AllSales /> },
  { path: "/new", element: <NewSale /> },
  { path: "/:id", element: <SaleDetails /> },
];
