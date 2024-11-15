import {
  AttachMoneyIcon,
  DashboardIcon,
  InventoryIcon,
  GroupsIcon,
  LocalShippingIcon,
  SettingsIcon,
  DescriptionIcon,
  SellIcon,
} from "src/assets/svg";

export const SIDEBAR_OPTIONS: { path: string; label: string; icon: string }[] =
  [
    // MVP
    { path: "/products", label: "Productos", icon: InventoryIcon },
    { path: "/sales", label: "Ventas", icon: AttachMoneyIcon },
    { path: "/dashboard", label: "Dashboard", icon: DashboardIcon },

    // MDP
    { path: "/clients", label: "Clientes", icon: GroupsIcon },
    { path: "/suppliers", label: "Proveedores", icon: LocalShippingIcon },
    { path: "/settings", label: "Ajustes", icon: SettingsIcon },
    { path: "/docs", label: "Documentación", icon: DescriptionIcon },
    { path: "/offers", label: "Ofertas", icon: SellIcon },
  ];
