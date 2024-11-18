import { SaleType } from "@globalTypes/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import api from "src/axiosConfig";

const createSale = async (newSale: SaleType) => {
  const { data } = await api.post("/sales", newSale);
  return data;
};

type Props = UseMutationOptions<SaleType, Error, SaleType>;

const useCreateSale = ({ ...queryOptions }: Props = {}) => {
  return useMutation({
    mutationFn: createSale,
    ...queryOptions,
  });
};

export default useCreateSale;
