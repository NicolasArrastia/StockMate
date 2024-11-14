import { Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout";
import { saleRoutes } from "./saleRoutes";

const Sales = () => {
  return (
    <Layout>
      <Routes>
        {saleRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Layout>
  );
};

export default Sales;
