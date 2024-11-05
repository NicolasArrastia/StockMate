import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { ProductType } from "../../../../../types";

const deleteProduct = async (id: string): Promise<ProductType> => {
  const { data } = await axios.delete<ProductType>(`/products/${id}`);
  return data;
};

const useDeleteProduct = (
  options?: UseMutationOptions<ProductType, Error, string>
): UseMutationResult<ProductType, Error, string> => {
  return useMutation<ProductType, Error, string>({
    mutationFn: deleteProduct,
    ...options,
  });
};

export default useDeleteProduct;
