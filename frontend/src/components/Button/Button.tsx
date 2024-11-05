import { ButtonHTMLAttributes } from "react";

// TODO: make enum
export type ButtonVariant = "primary" | "secondary" | "error";

type Props = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = "primary", children, onClick }: Props) => {
  const primaryVariant = "bg-blue-500 text-neutral-100";
  const secondaryVariant = "bg-neutral-400 text-neutral-100";
  const errorVariant = "bg-red-500 text-white";

  const variants: Record<ButtonVariant, string> = {
    primary: primaryVariant,
    secondary: secondaryVariant,
    error: errorVariant,
  };

  return (
    <button
      onClick={onClick}
      className={`
        py-1 px-4 font-bold rounded-sm w-fit h-fit cursor-pointer
        ${variants[variant]}

      `}
    >
      {children}
    </button>
  );
};

export default Button;
