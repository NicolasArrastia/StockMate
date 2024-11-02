import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { ProductType } from "../../../../../../types";
import { useParams } from "react-router-dom";
import useGetProduct from "../../hooks/useGetProduct";
import useCreateProduct from "../../hooks/useCreateProduct";
import useUpdateProduct from "../../hooks/useUpdateProduct";

type FormData = Partial<ProductType>;

type Props = {
  mode: "create" | "update";
};

const ProductForm = ({ mode }: Props) => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProduct(id);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: mode === "update" ? product || {} : {},
  });

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  // const { mutate: deleteProduct } = useDeleteProduct();

  const onSubmit = (data: FormData) => {
    if (mode === "create") {
      createProduct(data);
    } else {
      // updateProduct(data);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input<FormData> label="Nombre" name="name" register={register} />
      <Input<FormData>
        label="Precio"
        name="price"
        register={register}
        type="number"
      />
      <Input<FormData>
        label="Descripción"
        name="description"
        register={register}
      />

      <footer className="flex gap-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          type="submit"
        >
          {mode === "create" ? "Crear" : "Editar"}
        </Button>
        {mode === "update" && (
          <Button onClick={() => {}} variant="error">
            Eliminar
          </Button>
        )}
      </footer>
    </form>
  );
};

export default ProductForm;
