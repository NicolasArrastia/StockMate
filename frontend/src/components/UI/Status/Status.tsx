import SvgIcon from "src/components/SvgIcon";
import { SaleStatusEnum } from "@globalTypes/types";
import { config } from "./constants";
import { TailwindColors } from "src/features/Settings/components/Categories/enums";

type Props = {
  status: SaleStatusEnum;
};

const Status = ({ status }: Props) => {
  const { icon, label, color } = config[status];

  return (
    <div
      className={`${color} w-fit rounded-full px-2 py-0.5 text-white flex items-center gap-1 uppercase font-semibold text-sm`}
    >
      <SvgIcon icon={icon} size={20} color={TailwindColors.NEUTRAL50} />
      {label}
    </div>
  );
};

export default Status;
