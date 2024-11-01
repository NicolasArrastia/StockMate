import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type Props = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = "primary", children, onClick }: Props) => {
  const primaryVariant = "bg-blue-500 text-neutral-100";
  const secondaryVariant = "bg-neutral-400 text-neutral-100";

  const variants: Record<ButtonVariant, string> = {
    primary: primaryVariant,
    secondary: secondaryVariant,
  };

  return (
    <div
      onClick={onClick}
      className={`py-1 px-3 font-bold rounded-md w-fit h-fit cursor-pointer ${variants[variant]}`}
    >
      {children}
    </div>
  );
};

export default Button;
