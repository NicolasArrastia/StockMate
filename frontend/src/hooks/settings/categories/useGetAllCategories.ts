import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { CategoryType } from "@types/types.ts";

const getAllCategories = async (): Promise<CategoryType[]> => {
  const { data } = await axios.get<CategoryType[]>("/categories");
  return data;
};

export const GET_ALL_CATEGORIES_KEY = "GET_ALL_CATEGORIES_KEY";

const useGetAllCategories = (): UseQueryResult<CategoryType[], Error> => {
  return useQuery<CategoryType[], Error>({
    queryKey: [GET_ALL_CATEGORIES_KEY],
    queryFn: getAllCategories,
  });
};

export default useGetAllCategories;
