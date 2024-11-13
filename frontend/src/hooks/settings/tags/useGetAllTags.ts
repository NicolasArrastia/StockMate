import axios from "../../../axiosConfig";
import { TagType } from "@globalTypes/types.ts";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

const getAllTags = async (search?: string): Promise<TagType[]> => {
  const { data } = await axios.get<TagType[]>("/tags", {
    params: { search },
  });
  return data;
};

export const GET_ALL_TAGS_KEY = "GET_ALL_TAGS_KEY";

type Props = {
  search?: string;
} & Partial<UseQueryOptions<TagType[], Error>>;

const useGetAllTags = ({ search, ...queryOptions }: Props = {}): UseQueryResult<
  TagType[],
  Error
> => {
  return useQuery<TagType[], Error>({
    ...queryOptions,
    queryKey: [GET_ALL_TAGS_KEY, search],
    queryFn: () => getAllTags(search),
  });
};

export default useGetAllTags;
