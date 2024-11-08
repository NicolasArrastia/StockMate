import { useState } from "react";
import Layout from "../../components/Layout";
import Switch from "../../components/Switch";
import useGetAllCategories from "../../hooks/settings/categories/useGetAllCategories";

const Settings = () => {
  const [isOn, setIsOn] = useState(true);
  const { data, isLoading } = useGetAllCategories();

  console.log(data);
  return (
    <Layout>
      <h1>Ajustes</h1>
      <div>esto esta en desarrollo, no funciona</div>

      <h2 className="font-semibold text-xl mt-2">Categorias</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>{data?.length ? <>no categorias</> : <>hay categorias</>}</>
      )}

      <h2 className="font-semibold text-xl mt-2">Configuraciones</h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Switch isOn={isOn} onToggle={() => setIsOn((prev) => !prev)} />
          <span>Activar ayuda en formularios</span>
        </div>
        <div className="flex gap-2">
          <Switch isOn={isOn} onToggle={() => setIsOn((prev) => !prev)} />
          <span>Activar ayuda en formularios</span>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
