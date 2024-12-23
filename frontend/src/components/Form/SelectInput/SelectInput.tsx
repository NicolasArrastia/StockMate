import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
};

const SelectInput = <T extends FieldValues>({
  label,
  name,
  register,
  options,
  placeholder,
}: Props<T>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1 uppercase text-neutral-600"
      >
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className="border rounded-md p-2 w-full"
        defaultValue={undefined}
      >
        <option value={undefined}>{placeholder}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
