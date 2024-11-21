import { useMemo, useState } from "react";
import { DeleteForeverIcon } from "../../../../assets/svg";
import Button from "../../../../components/Button";
import Loader from "../../../../components/Loader";
import SvgIcon from "../../../../components/SvgIcon";
import useDeleteCategory from "../../../../hooks/settings/categories/useDeleteCategory";
import useGetAllCategories, {
  GET_ALL_CATEGORIES_KEY,
} from "../../../../hooks/settings/categories/useGetAllCategories";
import { TailwindColors } from "./enums";
import useCreateCategory from "../../../../hooks/settings/categories/useCreateCategory";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const Categories = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllCategories();
  const { mutate: deleteCategory } = useDeleteCategory({
    onSuccess: () => {
      toast.success("Categoría eliminada con éxito");
      queryClient.invalidateQueries({ queryKey: [GET_ALL_CATEGORIES_KEY] });
    },
  });

  const categories = useMemo(() => data, [data]);

  const [newCategory, setNewCategory] = useState("");
  const { mutate: createCategory } = useCreateCategory({
    onSuccess: () => {
      setNewCategory("");
      toast.success("Categoria creada con éxito");
      queryClient.invalidateQueries({ queryKey: [GET_ALL_CATEGORIES_KEY] });
    },
    onError: (error) => {
      console.error("Error creating category:", error);
      toast.error("Error creando la categoría");
    },
  });

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  return (
    <>
      <h2 className="font-semibold text-xl my-2">Categorias</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {categories?.length ? (
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center gap-2">
                  <div className="flex items-center">
                    {/* <SvgIcon
                      icon={EditIcon}
                      color={TailwindColors.NEUTRAL500}
                      onClick={() => handleEdit(category._id)}
                    /> */}
                    <div className="bg-neutral-300 p-1 rounded-full">
                      <SvgIcon
                        icon={DeleteForeverIcon}
                        color={TailwindColors.RED500}
                        className="cursor-pointer"
                        onClick={() => handleDelete(category._id)}
                      />
                    </div>
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
      <input
        type="text"
        className="shadow-md mr-2 mt-2 py-1 px-2 rounded-sm"
        placeholder="Nueva Categoria..."
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button onClick={() => createCategory({ name: newCategory })}>
        + Categoria
      </Button>
    </>
  );
};

export default Categories;
