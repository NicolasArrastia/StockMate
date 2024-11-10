import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { CategoryType } from "../../../../../types";

const deleteCategory = async (id: string): Promise<CategoryType> => {
  const { data } = await axios.delete(`/categories/${id}`);
  return data;
};

const useDeleteCategory = (
  queryOptions?: UseMutationOptions<CategoryType, Error, string>
): UseMutationResult<CategoryType, Error, string> => {
  return useMutation({
    mutationFn: deleteCategory,
    ...queryOptions,
  });
};

export default useDeleteCategory;
