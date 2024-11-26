import SvgIcon from "../SvgIcon";
import { LoaderIcon } from "../../assets/svg";
import { TailwindColors } from "src/features/Settings/components/Categories/enums";

const Loader = () => {
  return (
    <SvgIcon icon={LoaderIcon} size={50} color={TailwindColors.NEUTRAL500} />
  );
};

export default Loader;
