import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { ProductPopulatedType } from "@globalTypes/types.ts";

const getProduct = async (id?: string): Promise<ProductPopulatedType> => {
  const { data } = await axios.get<ProductPopulatedType>(`/products/${id}`);
  return data;
};

const useGetProduct = (
  id?: string
): UseQueryResult<ProductPopulatedType, Error> => {
  return useQuery<ProductPopulatedType, Error>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export default useGetProduct;
