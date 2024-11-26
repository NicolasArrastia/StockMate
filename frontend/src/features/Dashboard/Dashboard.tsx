import useGetLowStock from "src/hooks/metrics/useGetLowStock";
import useGetOutOfStock from "src/hooks/metrics/useGetOutOfStock";
import Layout from "../../components/Layout";
import { ErrorIcon, WarningIcon } from "src/assets/svg";
import SvgIcon from "src/components/SvgIcon";
import { TailwindColors } from "../Settings/components/Categories/enums";

const Dashboard = () => {
  const { data: lowStock } = useGetLowStock();
  const { data: outOfStock } = useGetOutOfStock();

  const METRICS = [
    {
      label: "Productos bajo stock:",
      color: "bg-orange-500",
      icon: WarningIcon,
      value: lowStock?.lowStockCount,
    },
    {
      label: "Productos sin stock",
      color: "bg-red-500",
      icon: ErrorIcon,
      value: outOfStock?.outOfStockCount,
    },
  ];

  return (
    <Layout>
      <h1>Dashboard</h1>

      {METRICS.map(({ label, color, icon, value }) => (
        <div key={label} className={`flex items-center gap-2 ${color} w-fit`}>
          <SvgIcon icon={icon} color={TailwindColors.NEUTRAL50} />
          <span>
            {label} <span>{value}</span>
          </span>
        </div>
      ))}
    </Layout>
  );
};

export default Dashboard;
