import {
  AttachMoneyIcon,
  DashboardIcon,
  DescriptionIcon,
  GroupsIcon,
  InventoryIcon,
  LocalShippingIcon,
  SettingsIcon,
} from "../../../../assets/svg";

export const SIDEBAR_OPTIONS: { path: string; label: string; icon: string }[] =
  [
    // MVP
    { path: "/products", label: "Productos", icon: InventoryIcon },
    { path: "/sales", label: "Ventas", icon: AttachMoneyIcon },
    { path: "/settings", label: "Ajustes", icon: SettingsIcon },
    { path: "/dashboard", label: "Dashboard", icon: DashboardIcon },

    // MDP
    { path: "/clients", label: "Clientes", icon: GroupsIcon },
    { path: "/providers", label: "Proveedores", icon: LocalShippingIcon },
    { path: "/docs", label: "Documentación", icon: DescriptionIcon },
  ];
