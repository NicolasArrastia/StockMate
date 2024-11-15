import { useQuery } from "@tanstack/react-query";
import api from "src/axiosConfig";

const getOutOfStock = async (): Promise<{ outOfStockCount: number }> => {
  const { data } = await api.get("/metrics/out-of-stock");
  return data;
};

export const GET_OUT_OF_STOCK_KEY = "GET_OUT_OF_STOCK_KEY";
const useGetOutOfStock = () => {
  return useQuery({
    queryKey: [GET_OUT_OF_STOCK_KEY],
    queryFn: getOutOfStock,
  });
};

export default useGetOutOfStock;
