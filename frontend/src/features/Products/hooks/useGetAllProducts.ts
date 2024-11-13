import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { ProductPopulatedType } from "@globalTypes/types.ts";

const getAllProducts = async (
  search?: string
): Promise<ProductPopulatedType[]> => {
  const { data } = await axios.get<ProductPopulatedType[]>("/products", {
    params: { search },
  });
  return data;
};

export const GET_ALL_PRODUCTS_KEY = "GET_ALL_PRODUCTS_KEY";

type Params = {
  search?: string;
  queryOptions?: UseQueryOptions<ProductPopulatedType[], Error>;
};

const useGetAllProducts = ({
  search,
  queryOptions,
}: Params): UseQueryResult<ProductPopulatedType[], Error> => {
  return useQuery<ProductPopulatedType[], Error>({
    queryKey: [GET_ALL_PRODUCTS_KEY, search],
    queryFn: () => getAllProducts(search),
    ...queryOptions,
    select: (data) => data || [],
  });
};

export default useGetAllProducts;
