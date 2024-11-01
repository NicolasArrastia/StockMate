type ButtonType = "primary" | "secondary";

type Props = {
  type?: ButtonType;
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ type = "primary", children, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="bg-blue-500 py-1 px-3 font-bold text-neutral-100 rounded-md w-fit h-fit cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Button;
