import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
};

function Input<T extends FieldValues>({
  label,
  name,
  register,
  type = "text",
  placeholder,
}: InputProps<T>) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name as string}
        className="block text-sm font-medium mb-1"
      >
        {label}
      </label>
      <input
        id={name as string}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="border rounded-md p-2 w-full"
      />
    </div>
  );
}

export default Input;
