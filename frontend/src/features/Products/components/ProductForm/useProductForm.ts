import { toast } from "react-toastify";
import { ButtonVariant } from "../../../../components/Button/Button";
import useCreateProduct from "../../hooks/useCreateProduct";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGetProduct from "../../hooks/useGetProduct";
import { useEffect } from "react";
import { ProductType } from "@types/types";

type FormModes = "create" | "update";

type ProductFormFields = Partial<ProductType> & { _id: ProductType["_id"] };

type Props = {
  mode: FormModes;
};

const useProductForm = ({ mode }: Props) => {
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

  return { buttons, register, isLoading, getValues };
};

export default useProductForm;
