import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ProductType } from "@types/types.ts";
import axios from "../../../axiosConfig";

const createProduct = async (
  newProduct: Partial<ProductType>
): Promise<ProductType> => {
  const { data } = await axios.post<ProductType>("/products", newProduct);
  return data;
};

const useCreateProduct = (
  options?: UseMutationOptions<ProductType, Error, Partial<ProductType>>
): UseMutationResult<ProductType, Error, Partial<ProductType>> => {
  return useMutation<ProductType, Error, Partial<ProductType>>({
    mutationFn: createProduct,
    ...options,
  });
};

export default useCreateProduct;
