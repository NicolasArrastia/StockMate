import { TagType } from "@globalTypes/types";
import axios from "../../../axiosConfig";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

const deleteTag = async (id: string) => {
  const { data } = await axios.delete<TagType>(`/tags/${id}`);
  return data;
};

type Props = UseMutationOptions<TagType, Error, string>;

const useDeleteTag = ({ ...queryOptions }: Props = {}) => {
  return useMutation({ mutationFn: deleteTag, ...queryOptions });
};

export default useDeleteTag;
