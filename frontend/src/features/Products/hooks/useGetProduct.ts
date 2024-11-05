import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { ProductType } from "../../../../../types";

const fetchProductById = async (id?: string): Promise<ProductType> => {
  const { data } = await axios.get<ProductType>(`/products/${id}`);
  return data;
};

const useGetProduct = (id?: string): UseQueryResult<ProductType, Error> => {
  return useQuery<ProductType, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};

export default useGetProduct;
