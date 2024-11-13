type Props = {
  name: string;
};

const Category = ({ name }: Props) => {
  return (
    <span className="py-1/2 px-2 bg-neutral-300 border border-neutral-400 rounded-sm font-semibold text-neutral-700">
      {name}
    </span>
  );
};

export default Category;
