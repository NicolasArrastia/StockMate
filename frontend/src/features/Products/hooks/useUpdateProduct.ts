import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ProductType } from "../../../../../types";
import axios from "../../../axiosConfig";

const updateProduct = async ({
  productId,
  updatedFields,
}: {
  productId: string;
  updatedFields: Partial<ProductType>;
}): Promise<ProductType> => {
  const { data } = await axios.put<ProductType>(
    `/products/${productId}`,
    updatedFields
  );
  return data;
};

const useUpdateProduct = (): UseMutationResult<
  ProductType,
  Error,
  { productId: string; updatedFields: Partial<ProductType> }
> => {
  return useMutation<
    ProductType,
    Error,
    { productId: string; updatedFields: Partial<ProductType> }
  >({
    mutationFn: updateProduct,
  });
};

export default useUpdateProduct;
