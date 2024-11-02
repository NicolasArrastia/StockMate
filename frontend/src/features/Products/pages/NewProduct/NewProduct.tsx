import { toast } from "react-toastify";
import ProductForm from "../../components/ProductForm/ProductForm";
import { ProductFormData } from "../../types";
import useCreateProduct from "../../hooks/useCreateProduct";

const NewProduct = () => {
  const { mutate } = useCreateProduct();

  const handleCreateProduct = (data: ProductFormData) => {
    mutate(data, {
      onSuccess: () => toast.success("Creado"),
      onError: (e) => toast.error(e.message),
    });
  };

  return <ProductForm mode={"create"} onSubmit={handleCreateProduct} />;
};

export default NewProduct;
