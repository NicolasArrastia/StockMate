import { Route, Routes } from "react-router-dom";
import { productRoutes } from "./productRoutes";
import Layout from "../../components/Layout";

const Products = () => {
  return (
    <Layout>
      <Routes>
        {productRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Layout>
  );
};

export default Products;
