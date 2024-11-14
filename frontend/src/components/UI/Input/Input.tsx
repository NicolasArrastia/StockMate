import { InputHTMLAttributes } from "react";

type Props = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: Props = { type: "text" }) => {
  return (
    <input
      className={`border rounded-sm px-2 py-2 h-fit w-full ${className}`}
      {...props}
    />
  );
};

export default Input;
