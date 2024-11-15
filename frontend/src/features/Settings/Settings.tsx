import Layout from "../../components/Layout";
import Categories from "./components/Categories";
import Tags from "./components/Tags";

const Settings = () => {
  return (
    <Layout>
      <h1>Ajustes</h1>
      <div>esto esta en desarrollo, no funciona</div>
      <Categories />
      <Tags />
      <h2 className="font-semibold text-xl mt-2">Configuraciones</h2>
      <span>Activar ayuda en formularios</span>
      <h3>Ventas</h3>
      <span>Metodo de pago por defecto</span>
    </Layout>
  );
};

export default Settings;
