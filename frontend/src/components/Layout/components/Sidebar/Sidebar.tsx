import { Link } from "react-router-dom";
import SvgIcon from "../../../SvgIcon";
import { SIDEBAR_OPTIONS } from "./constants";
import { TailwindColors } from "src/features/Settings/components/Categories/enums";

const Sidebar = () => {
  return (
    <aside className="bg-neutral-800 text-neutral-50">
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
                <div className="flex items-center gap-2">
                  <SvgIcon
                    icon={option.icon}
                    color={TailwindColors.NEUTRAL50}
                  />
                  <span className="text-lg relative z-10">{option.label}</span>
                </div>
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
