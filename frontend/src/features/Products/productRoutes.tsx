import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import { RouteType } from "../../types";

export const productRoutes: RouteType[] = [
  { path: "/", element: <AllProducts /> },
  { path: "new", element: <NewProduct /> },
  { path: ":id", element: <EditProduct /> },
];
