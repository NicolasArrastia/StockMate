import useGetAllTags, {
  GET_ALL_TAGS_KEY,
} from "../../../../hooks/settings/tags/useGetAllTags";
import Tag from "../../../../components/UI/Tag/Tag";
import Loader from "../../../../components/Loader";
import SvgIcon from "../../../../components/SvgIcon";
import { DeleteForeverIcon } from "../../../../assets/svg";
import { TailwindColors } from "../Categories/enums";
import Button from "../../../../components/Button";
import { useState } from "react";
import useCreateTag from "../../../../hooks/settings/tags/useCreateTag";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useDeleteTag from "../../../../hooks/settings/tags/useDeleteTag";
import useUpdateTag from "../../../../hooks/settings/tags/useUpdateTag";

const Tags = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetAllTags();
  const [newTag, setNewTag] = useState("");
  const { mutate: createTag } = useCreateTag({
    onSuccess: () => {
      setNewTag("");
      toast.success("Tag creado con éxito");
      queryClient.invalidateQueries({ queryKey: [GET_ALL_TAGS_KEY] });
    },
    onError: () => {
      toast.error("Hubo un error al crear el tag");
    },
  });

  const { mutate: deleteTag } = useDeleteTag({
    onSuccess: () => {
      toast.success("Tag eliminado con éxito");
      queryClient.invalidateQueries({ queryKey: [GET_ALL_TAGS_KEY] });
    },
    onError: () => {
      toast.error("Hubo un error al eliminar el tag");
    },
  });

  const { mutate: updateTag } = useUpdateTag({
    onSuccess: () => {
      toast.success("Tag actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: [GET_ALL_TAGS_KEY] });
    },
    onError: () => {
      toast.error("Hubo un error al actualizar el tag");
    },
  });

  return (
    <>
      <h2 className="font-semibold text-xl my-2">Tags</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-2">
          {data?.length ? (
            <>
              {data?.map(({ _id, name, color }) => (
                <div key={_id} className="flex">
                  {/* <SvgIcon icon={EditIcon} color={TailwindColors.NEUTRAL500} /> */}
                  <SvgIcon
                    icon={DeleteForeverIcon}
                    color={TailwindColors.RED500}
                    onClick={() => deleteTag(_id)}
                    className="cursor-pointer"
                  />
                  <Tag name={name} color={color} className="ml-2" />
                  <input
                    type="color"
                    defaultValue={color}
                    onBlur={(e) => {
                      console.log(e.target.value);
                      updateTag({
                        tagId: _id,
                        updatedFields: { color: e.target.value },
                      });
                    }}
                  />
                </div>
              ))}
            </>
          ) : (
            <>no data</>
          )}
        </div>
      )}
      <input
        type="text"
        className="shadow-md mr-2 mt-2 py-1 px-2 rounded-sm"
        placeholder="Nueva Categoria..."
        onChange={(e) => setNewTag(e.target.value)}
      />
      <Button onClick={() => createTag({ name: newTag })}>+ Categoria</Button>
    </>
  );
};

export default Tags;
