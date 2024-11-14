type Props = {
  isOn: boolean;
  onToggle: () => void;
};

const Switch = ({ isOn, onToggle }: Props) => {
  return (
    <div
      onClick={onToggle}
      className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isOn ? "bg-blue-400" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
          isOn ? "translate-x-4" : "translate-x-0"
        } transition`}
      ></div>
    </div>
  );
};

export default Switch;
