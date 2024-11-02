import { toast } from "react-toastify";
import ProductForm from "../../components/ProductForm/ProductForm";
import { ProductFormData } from "../../types";
import useUpdateProduct from "../../hooks/useUpdateProduct";

const EditProduct = () => {
  const { mutate } = useUpdateProduct();
  const handleUpdateProduct = (data: ProductFormData) => {
    mutate(data, {
      onSuccess: () => toast.success("Editado con exitosamente"),
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <div>
      <ProductForm mode="update" onSubmit={handleUpdateProduct} />
    </div>
  );
};

export default EditProduct;
