import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../axiosConfig";
import { ProductType } from "../../../types";

const fetchProducts = async (): Promise<ProductType[]> => {
  const { data } = await axios.get<ProductType[]>("/products");
  return data;
};

const useProducts = (): UseQueryResult<ProductType[], Error> => {
  return useQuery<ProductType[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useProducts;
