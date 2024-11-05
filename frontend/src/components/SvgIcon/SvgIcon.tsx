import React from "react";

type MaskedSvgIconProps = {
  icon: string; // URL to the SVG icon
  size?: number | string;
  color?: string;
};

const SvgIcon: React.FC<MaskedSvgIconProps> = ({
  icon,
  size = 24,
  color = "currentColor",
}) => {
  return (
    <div
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
  );
};

export default SvgIcon;
