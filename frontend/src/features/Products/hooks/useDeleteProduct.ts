import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { ProductPopulatedType } from "@globalTypes/types.ts";

const deleteProduct = async (id: string): Promise<ProductPopulatedType> => {
  const { data } = await axios.delete<ProductPopulatedType>(`/products/${id}`);
  return data;
};

const useDeleteProduct = (
  options?: UseMutationOptions<ProductPopulatedType, Error, string>
): UseMutationResult<ProductPopulatedType, Error, string> => {
  return useMutation<ProductPopulatedType, Error, string>({
    mutationFn: deleteProduct,
    ...options,
  });
};

export default useDeleteProduct;
