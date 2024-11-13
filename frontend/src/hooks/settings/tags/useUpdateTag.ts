import { TagType } from "@globalTypes/types";
import axios from "../../../axiosConfig";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

const updateTag = async ({
  tagId,
  updatedFields,
}: {
  tagId: string;
  updatedFields: Partial<TagType>;
}) => {
  const { data } = await axios.put<TagType>(`/tags/${tagId}`, updatedFields);
  return data;
};

type Props = UseMutationOptions<
  TagType,
  Error,
  {
    tagId: string;
    updatedFields: Partial<TagType>;
  }
>;

const useUpdateTag = ({ ...queryOptions }: Props = {}) => {
  return useMutation({
    mutationFn: updateTag,
    ...queryOptions,
  });
};

export default useUpdateTag;
