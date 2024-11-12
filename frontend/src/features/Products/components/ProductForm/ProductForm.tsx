import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { ProductType } from "@types/types.ts";
import { useMemo, useState } from "react";
import Loader from "../../../../components/Loader";
import useGetAllCategories from "../../../../hooks/settings/categories/useGetAllCategories";
import SelectInput from "../../../../components/SelectInput";
import useGetAllTags from "../../../../hooks/settings/tags/useGetAllTags";
import SwitchInput from "../../../../components/SwitchInput";
import useProductForm from "./useProductForm";

type ProductFormFields = Partial<ProductType> & { _id: ProductType["_id"] };

type FormModes = "create" | "update";

type Props = {
  mode: FormModes;
};

const SECTION_CLASSES = "bg-neutral-200 p-4 rounded-sm gap-8";

// TODO: create useProductForm hook for handling logic
const ProductForm = ({ mode }: Props) => {
  const { buttons, getValues, isLoading, register } = useProductForm({ mode });

  const { data: categories } = useGetAllCategories();
  const [tagSearch, setTagSearch] = useState("");
  const { data: tags } = useGetAllTags({ search: tagSearch });

  const formattedCategories = useMemo(() => {
    return (
      categories?.map((category) => ({
        label: category.name,
        value: category._id,
      })) || []
    );
  }, [categories]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1>{getValues("name")}</h1>
          <div className={`${SECTION_CLASSES} grid grid-cols-3`}>
            <Input<ProductFormFields>
              label="Precio"
              name="price"
              register={register}
              type="number"
            />
            <Input<ProductFormFields>
              label="Precio Coste"
              name="costPrice"
              register={register}
              type="number"
            />
            <div>
              {Number(getValues("costPrice")) && Number(getValues("price"))
                ? `${(
                    (Number(getValues("costPrice")) * 100) /
                    Number(getValues("price"))
                  ).toFixed(2)}%`
                : null}
            </div>
          </div>
          <div
            className={`grid grid-cols-3 grid-rows-2 gap-8 ${SECTION_CLASSES}`}
          >
            <Input<ProductFormFields>
              label="Nombre"
              name="name"
              register={register}
            />
            <Input<ProductFormFields>
              label="Descripción"
              name="description"
              register={register}
            />
            <SelectInput<ProductFormFields>
              label={"Categoria"}
              name="category"
              register={register}
              options={formattedCategories}
            />

            <div className="flex flex-col">
              <label
                htmlFor="tags"
                className="text-sm font-semibold text-gray-600 uppercase"
              >
                Add a tag:
              </label>
              <input
                list="tag-options"
                id="tags"
                name="tags"
                placeholder="Select or type a tag"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="tag-options">
                {tags?.map((tag) => (
                  <option key={tag._id} value={tag.name} />
                ))}
              </datalist>
            </div>
          </div>

          <div
            className={`grid grid-cols-3 gap-8 ${SECTION_CLASSES} items-center`}
          >
            <Input<ProductFormFields>
              label="Cantidad"
              name="quantityOnStock"
              register={register}
            />
            <Input<ProductFormFields>
              label="Advertencia Cantidad"
              name="lowQuantityWarning"
              register={register}
            />
            <SwitchInput
              label="Ignorar cantidad"
              isOn={false}
              onToggle={() => {}}
            />
          </div>

          <div className={`${SECTION_CLASSES}`}>
            <div>supplier</div>
            <div className="mt-2">
              <span className="p-2 rounded-full bg-neutral-400 font-semibold text-neutral-100">
                LM
              </span>{" "}
              <span>Luis Marroquin</span>
            </div>
          </div>

          <footer className="flex gap-4">
            {buttons[mode].map(({ text, onClick, variant }) => (
              <Button key={text} onClick={onClick} variant={variant}>
                {text}
              </Button>
            ))}
          </footer>
          <Button onClick={() => console.log(getValues())}>Ver Data</Button>
        </form>
      )}
    </>
  );
};

export default ProductForm;
