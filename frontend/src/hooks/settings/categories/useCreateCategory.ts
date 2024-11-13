import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { CategoryType } from "@globalTypes/types.ts";
import axios from "../../../axiosConfig";

const createCategory = async (newCategory: Partial<CategoryType>) => {
  const { data } = await axios.post<CategoryType>("/categories", newCategory);
  return data;
};

const useCreateCategory = ({
  ...queryOptions
}: UseMutationOptions<
  CategoryType,
  Error,
  Partial<CategoryType>
> = {}): UseMutationResult<CategoryType, Error, Partial<CategoryType>> => {
  return useMutation<CategoryType, Error, Partial<CategoryType>>({
    mutationFn: createCategory,
    ...queryOptions,
  });
};

export default useCreateCategory;
