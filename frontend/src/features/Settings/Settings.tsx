import { useState } from "react";
import Layout from "../../components/Layout";
import Categories from "./components/Categories";
import Tags from "./components/Tags";

const Settings = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <Layout>
      <h1>Ajustes</h1>
      <div>esto esta en desarrollo, no funciona</div>

      <Categories />
      <Tags />

      <h2 className="font-semibold text-xl mt-2">Configuraciones</h2>
      {/* <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Switch isOn={isOn} onToggle={() => setIsOn((prev) => !prev)} />
          <span>Activar ayuda en formularios</span>
        </div>
      </div> */}
    </Layout>
  );
};

export default Settings;
