import { ReactElement } from "react";
import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";

type RouteType = {
  path: string;
  element: ReactElement;
};

export const productRoutes: RouteType[] = [
  { path: "/", element: <AllProducts /> },
  { path: "new", element: <NewProduct /> },
  { path: ":id", element: <EditProduct /> },
];
