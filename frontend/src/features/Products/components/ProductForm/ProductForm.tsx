import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { ProductType } from "../../../../../../types";
import { useNavigate, useParams } from "react-router-dom";
import useGetProduct from "../../hooks/useGetProduct";
import useCreateProduct from "../../hooks/useCreateProduct";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import { toast } from "react-toastify";
import { ButtonVariant } from "../../../../components/Button/Button";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import { useEffect } from "react";
import Loader from "../../../../components/Loader";

type ProductFormData = Partial<ProductType> & { _id: ProductType["_id"] };

type FormModes = "create" | "update";

type Props = {
  mode: FormModes;
};

const ProductForm = ({ mode }: Props) => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProduct(id);
  const { register, handleSubmit, reset } = useForm<ProductFormData>({
    defaultValues: mode === "update" ? product || {} : {},
  });
  console.log({ mode, product });
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
  const { mutate: updateProduct } = useUpdateProduct({});
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
        onClick: () =>
          handleSubmit((data) => {
            updateProduct({ productId: data._id, updatedFields: data });
          }),
      },
      // TODO recicle this button
      {
        text: "Cancelar",
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-8 bg-neutral-200 p-4 rounded-sm">
            <Input<ProductFormData>
              label="Nombre"
              name="name"
              register={register}
            />
            <Input<ProductFormData>
              label="Precio"
              name="price"
              register={register}
              type="number"
            />
            <Input<ProductFormData>
              label="Descripción"
              name="description"
              register={register}
            />
          </div>

          {/* <div className="grid grid-cols-2 gap-8 bg-neutral-200 p-4 rounded-sm">
            <Input<ProductFormData>
              label="Cantidad"
              name="quantity"
              type="number"
              register={register}
            />
            <Input<ProductFormData>
              label="Aviso de Cantidad"
              name="quantityWarning"
              register={register}
            />
          </div> */}

          <footer className="flex gap-4">
            {buttons[mode].map(({ text, onClick, variant }) => (
              <Button key={text} onClick={onClick} variant={variant}>
                {text}
              </Button>
            ))}
          </footer>
        </form>
      )}
    </>
  );
};

export default ProductForm;
