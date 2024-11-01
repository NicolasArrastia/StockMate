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
        <ul className="p-4 flex flex-col gap-2">
          {SIDEBAR_OPTIONS.map((option) => (
            <li
              key={option.path}
              className=""
              // className="bg-neutral-700 "
            >
              <Link
                className="block relative w-full p-1 px-4 rounded-md overflow-hidden group"
                to={option.path}
              >
                <span className="text-lg relative z-10">{option.label}</span>
                <div className="absolute bg-blue-500/50 h-full w-0 group-hover:w-full transition-all top-0 left-0"></div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
