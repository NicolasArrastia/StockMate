type Props = {
  name: string;
  color: string;
  className?: string;
};

// TODO: move to utils
const getTextColorBasedOnBg = (bgColor: string): string => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 186 ? "#000" : "#FFF";
};

const Tag = ({ name, color, className }: Props) => {
  return (
    <span
      // TODO see if contentEditable is viable
      className={`w-fit px-4 py-1/2 rounded-full font-semibold ${className} ${
        getTextColorBasedOnBg(color) === "#000" && "shadow-md"
      }`}
      style={{
        backgroundColor: color,
        color: getTextColorBasedOnBg(color),
      }}
    >
      {name}
    </span>
  );
};

export default Tag;
