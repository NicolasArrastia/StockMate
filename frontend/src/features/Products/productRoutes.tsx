import { ReactElement } from "react";
import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";

type RouteType = {
  path: string;
  element: ReactElement;
};

export const productRoutes: RouteType[] = [
  { path: "/", element: <AllProducts /> },
  { path: "new", element: <NewProduct /> },
];
