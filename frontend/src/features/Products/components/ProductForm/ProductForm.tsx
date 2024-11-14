import Input from "../../../../components/Form/Input";
import Button from "../../../../components/Button";
import { ProductPopulatedType } from "@globalTypes/types";
import { useMemo } from "react";
import Loader from "../../../../components/Loader";
import useGetAllCategories from "../../../../hooks/settings/categories/useGetAllCategories";
import SelectInput from "../../../../components/SelectInput";
import useProductForm from "./useProductForm";
import ProfitValue from "./components/ProfitValue/ProfitValue";
import Switch from "../../../../components/Form/Switch";

type ProductFormFields = Partial<ProductPopulatedType> & {
  _id: ProductPopulatedType["_id"];
};

type FormModes = "create" | "update";

type Props = {
  mode: FormModes;
};

const SECTION_CLASSES = "bg-neutral-200 p-4 rounded-sm gap-8";

// TODO: create useProductForm hook for handling logic
const ProductForm = ({ mode }: Props) => {
  const { buttons, getValues, isLoading, register, watch, control } =
    useProductForm({
      mode,
    });
  const { data: categories } = useGetAllCategories();

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

          <div
            className={`grid grid-cols-4 items-center gap-8 ${SECTION_CLASSES}`}
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
            <Switch
              name="isActive"
              control={control}
              label="es un producto activo"
            />
          </div>

          <div className={`${SECTION_CLASSES} grid grid-cols-4 items-center`}>
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
              <span className="block text-sm font-medium mb-1 uppercase text-neutral-600">
                Ganancia
              </span>
              <ProfitValue
                price={watch("price")}
                costPrice={watch("costPrice")}
              />
            </div>

            <Switch<ProductFormFields>
              control={control}
              name="ignorePrice"
              label="Ignorar Precio"
            />
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
            <Switch<ProductFormFields>
              control={control}
              name="ignoreQuantity"
              label="Ignorar Cantidad"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`${SECTION_CLASSES}`}>
              <div>supplier</div>
              <div className="mt-2">
                <span className="p-2 rounded-full bg-neutral-400 font-semibold text-neutral-100">
                  LM
                </span>{" "}
                <span>Luis Marroquin</span>
              </div>
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
