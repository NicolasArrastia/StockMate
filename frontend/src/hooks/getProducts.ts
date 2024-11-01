import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../axiosConfig";
import { Product } from "../../../types";

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>("/products");
  return data;
};

const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useProducts;
