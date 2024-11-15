import { useQuery } from "@tanstack/react-query";
import api from "src/axiosConfig";

const getLowStock = async (): Promise<{ lowStockCount: number }> => {
  const { data } = await api.get("/metrics/low-stock");
  return data;
};

export const GET_LOW_STOCK_KEY = "GET_LOW_STOCK_KEY";
const useGetLowStock = () => {
  return useQuery({
    queryKey: [GET_LOW_STOCK_KEY],
    queryFn: getLowStock,
  });
};

export default useGetLowStock;
