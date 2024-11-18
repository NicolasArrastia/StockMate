import { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
} & InputHTMLAttributes<HTMLInputElement>;

const DateTimePicker = <T extends FieldValues>({
  label,
  name,
  register,
  ...props
}: Props<T>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1 uppercase text-neutral-600"
      >
        {label}
      </label>
      <input
        id={name}
        className="px-2 py-1.5 rounded-md border border-neutral-200"
        {...register(name)}
        {...props}
        type="datetime-local"
      />
    </div>
  );
};

export default DateTimePicker;
