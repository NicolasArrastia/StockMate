import { DeleteForeverIcon, EditIcon } from "../../../../assets/svg";
import Button from "../../../../components/Button";
import SvgIcon from "../../../../components/SvgIcon";
import useDeleteCategory from "../../../../hooks/settings/categories/useDeleteCategory";
import useGetAllCategories from "../../../../hooks/settings/categories/useGetAllCategories";
import { TailwindColors } from "./enums";

const Categories = () => {
  const { data, isLoading } = useGetAllCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  console.log(data);

  const handleEdit = (categoryId: string) => {
    console.log(categoryId);
    // Navigate to edit category page
    // navigate(`/settings/categories/edit/${categoryId}`);
  };

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  return (
    <>
      <h2 className="font-semibold text-xl my-2">Categorias</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data?.length ? (
            <div>
              {data.map((category) => (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <SvgIcon
                      icon={EditIcon}
                      color={TailwindColors.NEUTRAL500}
                      onClick={() => handleEdit(category._id)}
                    />
                    <SvgIcon
                      icon={DeleteForeverIcon}
                      color={TailwindColors.RED500}
                      onClick={() => handleDelete(category._id)}
                    />
                  </div>
                  <span className="py-1/2 px-2 bg-neutral-300 border border-neutral-400 rounded-sm font-semibold text-neutral-700">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <>no categorias</>
          )}
        </>
      )}
      <Button onClick={() => {}} className="mt-2">
        + Categoria
      </Button>
    </>
  );
};

export default Categories;
