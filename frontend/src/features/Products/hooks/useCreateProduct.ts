import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ProductPopulatedType } from "@globalTypes/types.ts";
import axios from "../../../axiosConfig";

const createProduct = async (
  newProduct: Partial<ProductPopulatedType>
): Promise<ProductPopulatedType> => {
  const { data } = await axios.post<ProductPopulatedType>(
    "/products",
    newProduct
  );
  return data;
};

const useCreateProduct = (
  options?: UseMutationOptions<
    ProductPopulatedType,
    Error,
    Partial<ProductPopulatedType>
  >
): UseMutationResult<
  ProductPopulatedType,
  Error,
  Partial<ProductPopulatedType>
> => {
  return useMutation<
    ProductPopulatedType,
    Error,
    Partial<ProductPopulatedType>
  >({
    mutationFn: createProduct,
    ...options,
  });
};

export default useCreateProduct;
