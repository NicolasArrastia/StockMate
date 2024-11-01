import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "../axiosConfig";
import { ProductType } from "../../../types";

const createProduct = async (
  newProduct: Partial<ProductType>
): Promise<ProductType> => {
  const { data } = await axios.post<ProductType>("/products", newProduct);
  return data;
};

const useCreateProduct = (): UseMutationResult<
  ProductType,
  Error,
  Partial<ProductType>
> => {
  return useMutation<ProductType, Error, Partial<ProductType>>({
    mutationFn: createProduct,
  });
};

export default useCreateProduct;
