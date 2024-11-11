import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { ProductType } from "@types/types.ts";

const getAllProducts = async (search?: string): Promise<ProductType[]> => {
  const { data } = await axios.get<ProductType[]>("/products", {
    params: { search },
  });
  return data;
};

export const GET_ALL_PRODUCTS_KEY = "GET_ALL_PRODUCTS_KEY";

type Params = {
  search?: string;
  queryOptions?: UseQueryOptions<ProductType[], Error>;
};

const useGetAllProducts = ({
  search,
  queryOptions,
}: Params): UseQueryResult<ProductType[], Error> => {
  return useQuery<ProductType[], Error>({
    queryKey: [GET_ALL_PRODUCTS_KEY, search],
    queryFn: () => getAllProducts(search),
    ...queryOptions,
    select: (data) => data || [],
  });
};

export default useGetAllProducts;
