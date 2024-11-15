import SvgIcon from "src/components/SvgIcon";
import { SaleStatusEnum } from "@globalTypes/types";
import { config } from "./constants";

type Props = {
  status: SaleStatusEnum;
};

const Status = ({ status }: Props) => {
  const { icon, label, color } = config[status];

  return (
    <div
      className={`${color} w-fit rounded-full px-2 py-0.5 text-white flex items-center gap-1 uppercase font-semibold text-sm`}
    >
      <SvgIcon icon={icon} size={20} />
      {label}
    </div>
  );
};

export default Status;
