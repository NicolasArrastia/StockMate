import React from "react";

type MaskedSvgIconProps = {
  icon: string; // URL to the SVG icon
  size?: number | string;
  color: string;
  onClick?: () => void;
  className?: string;
};

// TODO: Move this to utils file
const getColoredIcon = (svg: string, newColor: string) => {
  const decodedSvg = decodeURIComponent(svg.replace("data:image/svg+xml,", ""));
  const coloredSvg = decodedSvg.replace(
    /fill=['"][^'"]+['"]/,
    `fill='${newColor}'`
  );
  return `data:image/svg+xml,${encodeURIComponent(coloredSvg)}`;
};

const SvgIcon: React.FC<MaskedSvgIconProps> = ({
  icon,
  size = 24,
  color,
  onClick,
  className,
}) => {
  // TODO: Refactor this isDev
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div onClick={onClick}>
      {isDev ? (
        <div
          className={className}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            maskImage: `url(${icon})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url(${icon})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      ) : (
        <img
          src={getColoredIcon(icon, color)}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    </div>
  );
};

export default SvgIcon;
