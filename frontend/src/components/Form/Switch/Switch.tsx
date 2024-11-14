import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import SwitchUI from "../../UI/Switch";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

const Switch = <T extends FieldValues>({ name, control, label }: Props<T>) => {
  const handleToggle = (field: ControllerRenderProps<T>) => {
    field.onChange(!field.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex gap-2">
            <SwitchUI onToggle={() => handleToggle(field)} isOn={field.value} />
            <span>{label}</span>
          </div>
        );
      }}
    />
  );
};

export default Switch;
