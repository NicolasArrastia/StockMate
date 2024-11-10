import Switch from "../Switch";

type Props = {
  label: string;
  isOn: boolean;
  onToggle: () => void;
};

const SwitchInput = ({ label, isOn, onToggle }: Props) => {
  return (
    <div className="flex gap-2">
      <Switch isOn={isOn} onToggle={onToggle} />
      <span>{label}</span>
    </div>
  );
};

export default SwitchInput;
