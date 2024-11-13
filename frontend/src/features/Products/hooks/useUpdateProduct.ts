import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ProductPopulatedType } from "@globalTypes/types.ts";
import axios from "../../../axiosConfig";

const updateProduct = async ({
  productId,
  updatedFields,
}: {
  productId: string;
  updatedFields: Partial<ProductPopulatedType>;
}): Promise<ProductPopulatedType> => {
  const { data } = await axios.put<ProductPopulatedType>(
    `/products/${productId}`,
    updatedFields
  );
  return data;
};

const useUpdateProduct = (
  options?: UseMutationOptions<
    ProductPopulatedType,
    Error,
    { productId: string; updatedFields: Partial<ProductPopulatedType> }
  >
): UseMutationResult<
  ProductPopulatedType,
  Error,
  { productId: string; updatedFields: Partial<ProductPopulatedType> }
> => {
  return useMutation<
    ProductPopulatedType,
    Error,
    { productId: string; updatedFields: Partial<ProductPopulatedType> }
  >({
    mutationFn: updateProduct,
    ...options,
  });
};

export default useUpdateProduct;
