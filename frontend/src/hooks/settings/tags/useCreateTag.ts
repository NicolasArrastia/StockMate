import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../../axiosConfig";
import { TagType } from "@globalTypes/types";

const createTag = async (newTag: Partial<TagType>) => {
  const { data } = await axios.post<TagType>("/tags", newTag);
  return data;
};

type Props = UseMutationOptions<TagType, Error, Partial<TagType>>;

const useCreateTag = ({ ...queryOptions }: Props = {}) => {
  return useMutation({
    mutationFn: createTag,
    ...queryOptions,
  });
};

export default useCreateTag;
