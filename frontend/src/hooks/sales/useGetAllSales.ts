import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../axiosConfig";
import { SaleType } from "@globalTypes/types";

const getAllSales = async (): Promise<SaleType[]> => {
  const { data } = await api.get<SaleType[]>("/sales");
  return data;
};

export const GET_ALL_SALES_KEY = "GET_ALL_SALES_KEY";

const useGetAllSales = (): UseQueryResult<SaleType[], Error> => {
  return useQuery<SaleType[], Error>({
    queryKey: [GET_ALL_SALES_KEY],
    queryFn: getAllSales,
    select: (data) => data || [],
  });
};

export default useGetAllSales;
