import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductType } from "../../../../../types";
import axios from "../../../axiosConfig";

const fetchProductsByQuery = async (query: string): Promise<ProductType[]> => {
  const { data } = await axios.get<ProductType[]>(
    `/products/search?query=${query}`
  );
  return data;
};

const useSearchProducts = (
  query: string
): UseQueryResult<ProductType[], Error> => {
  return useQuery<ProductType[], Error>({
    queryKey: ["searchProducts", query],
    queryFn: () => fetchProductsByQuery(query),
    enabled: !!query,
  });
};

export default useSearchProducts;
