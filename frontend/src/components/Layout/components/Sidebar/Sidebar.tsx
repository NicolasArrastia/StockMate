import { Link } from "react-router-dom";

const SIDEBAR_OPTIONS: { path: string; label: string }[] = [
  // MVP
  { path: "/products", label: "Productos" },
  { path: "/sales", label: "Ventas" },
  { path: "/settings", label: "Ajustes" },
  { path: "/dashboard", label: "Dashboard" },

  // MDP
  { path: "/clients", label: "Clientes" },
  { path: "/providers", label: "Proveedores" },
  { path: "/docs", label: "Documentación" },
];

const Sidebar = () => {
  return (
    <aside className="bg-neutral-800 text-white">
      <nav>
        <ul>
          {SIDEBAR_OPTIONS.map((option) => (
            <li key={option.path}>
              <Link to={option.path}>{option.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
