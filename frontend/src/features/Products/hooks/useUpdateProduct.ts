import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ProductType } from "@types/types.ts";
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

const useUpdateProduct = (
  options?: UseMutationOptions<
    ProductType,
    Error,
    { productId: string; updatedFields: Partial<ProductType> }
  >
): UseMutationResult<
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
    ...options,
  });
};

export default useUpdateProduct;
