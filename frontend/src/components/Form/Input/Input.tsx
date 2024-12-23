import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  description?: string;
};

const Input = <T extends FieldValues>({
  label,
  name,
  register,
  type = "text",
  placeholder,
  description,
}: InputProps<T>) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1 uppercase text-neutral-600"
      >
        {label}
        {/* // TODO: Add this description as info */}
        {!!description && (
          <span className="text-xs text-neutral-400 font-medium">
            {description}
          </span>
        )}
      </label>
      <input
        id={name as string}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="border rounded-sm p-2 w-full"
      />
    </div>
  );
};

export default Input;
