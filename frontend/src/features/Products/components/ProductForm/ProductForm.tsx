import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import {
  RegisterOptions,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { ProductType } from "@types/types.ts";
import { useNavigate, useParams } from "react-router-dom";
import useGetProduct from "../../hooks/useGetProduct";
import useCreateProduct from "../../hooks/useCreateProduct";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import { toast } from "react-toastify";
import { ButtonVariant } from "../../../../components/Button/Button";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import { useEffect, useMemo } from "react";
import Loader from "../../../../components/Loader";
import useGetAllCategories from "../../../../hooks/settings/categories/useGetAllCategories";
import SelectInput from "../../../../components/SelectInput";
import useGetAllTags from "../../../../hooks/settings/tags/useGetAllTags";

type ProductFormFields = Partial<ProductType> & { _id: ProductType["_id"] };

type FormModes = "create" | "update";

type Props = {
  mode: FormModes;
};

// TODO: create useProductForm hook for handling logic
const ProductForm = ({ mode }: Props) => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProduct(id);
  const { register, handleSubmit, reset, getValues } =
    useForm<ProductFormFields>({
      defaultValues:
        mode === "update"
          ? { ...product, category: product?.category ?? undefined }
          : {},
    });
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "update" && product) {
      reset(product); // Reset the form with new product data
    }
  }, [product, mode, reset]);

  const { mutate: createProduct } = useCreateProduct({
    onSuccess: () => toast.success("Creado"),
    onError: (e) => toast.error(e.message),
  });
  const { mutate: updateProduct } = useUpdateProduct({
    onError: (e) => {
      toast.warn(e.response.data.error.message);
    },
    onSuccess: () => {
      toast.success("Producto actualizado");
      navigate("/products");
    },
  });
  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      toast.success("Eliminado con éxito");
      navigate("/products");
    },
    onError: (e) => toast.error(e.message),
  });

  const buttons: Record<
    FormModes,
    {
      text: string;
      onClick: () => void;
      variant?: ButtonVariant;
    }[]
  > = {
    update: [
      {
        text: "Editar",
        onClick: () => {
          handleSubmit((data) => {
            updateProduct({ productId: data._id, updatedFields: data });
          })();
        },
      },
      // TODO recicle this button
      {
        text: "Cancelar",
        variant: "secondary",
        onClick: () => {
          navigate(-1);
        },
      },
      {
        text: "Eliminar",
        onClick: () => {
          if (id) deleteProduct(id);
        },
        variant: "error",
      },
    ],
    create: [
      {
        text: "Crear",
        onClick: handleSubmit((data) => {
          createProduct(data);
          navigate("/products");
        }),
      },
      {
        text: "Cancelar",
        onClick: () => {
          navigate(-1);
        },
        variant: "secondary",
      },
    ],
  };

  const { data: categories } = useGetAllCategories();
  const { data: tags } = useGetAllTags();

  const formattedCategories = useMemo(() => {
    return (
      categories?.map((category) => ({
        label: category.name,
        value: category._id,
      })) || []
    );
  }, [categories]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-3 gap-8 bg-neutral-200 p-4 rounded-sm">
            <Input<ProductFormFields>
              label="Nombre"
              name="name"
              register={register}
            />
            <Input<ProductFormFields>
              label="Precio"
              name="price"
              register={register}
              type="number"
            />
            <Input<ProductFormFields>
              label="Descripción"
              name="description"
              register={register}
            />
          </div>

          <div className="grid grid-cols-3 gap-8 bg-neutral-200 p-4 rounded-sm">
            <SelectInput<ProductFormFields>
              label={"Categoria"}
              name="category"
              register={register}
              options={formattedCategories}
            />
            <div>
              <label htmlFor="tags">Add a tag:</label>
              <input
                list="tag-options"
                id="tags"
                name="tags"
                placeholder="Select or type a tag"
              />
              <datalist id="tag-options">
                <option value="Tag1" label="asd" />
                <option value="Tag2" />
                <option value="Tag3" />
                <option value="Tag4" />
              </datalist>
            </div>
            <div>
              {tags?.map((i) => (
                <>{i.name}</>
              ))}
            </div>
          </div>

          <footer className="flex gap-4">
            {buttons[mode].map(({ text, onClick, variant }) => (
              <Button key={text} onClick={onClick} variant={variant}>
                {text}
              </Button>
            ))}
          </footer>
          <Button onClick={() => console.log(getValues())}>Ver Data</Button>
        </form>
      )}
    </>
  );
};

export default ProductForm;
