import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { ProductType } from "../../../../../types";

const fetchProducts = async (): Promise<ProductType[]> => {
  const { data } = await axios.get<ProductType[]>("/products");
  return data;
};

export const GET_ALL_PRODUCTS_KEY = "GET_ALL_PRODUCTS_KEY";

const useGetProducts = (): UseQueryResult<ProductType[], Error> => {
  return useQuery<ProductType[], Error>({
    queryKey: [GET_ALL_PRODUCTS_KEY],
    queryFn: fetchProducts,
  });
};

export default useGetProducts;
