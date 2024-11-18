import SelectInput from "src/components/Form/SelectInput";
import Table from "src/components/Table";
import {
  PaymentMethodsEnum,
  ProductPopulatedType,
  SaleProductType,
  SaleStatusEnum,
  SaleType,
} from "@globalTypes/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Input from "src/components/UI/Input";
import SvgIcon from "src/components/SvgIcon";
import {
  AddIcon,
  BarcodeScannerIcon,
  DeleteForeverIcon,
  RemoveIcon,
} from "src/assets/svg";
import { TailwindColors } from "src/features/Settings/components/Categories/enums";
import { PAYMENT_METHODS_OPTIONS, SALE_STATUS_OPTIONS } from "src/constants";
import useNewSaleForm from "./useNewSaleForm";
import Button from "src/components/Button";
import { Controller, FormProvider } from "react-hook-form";
import InputForm from "src/components/Form/Input";
import DatePicker from "../../../../components/Form/DatePicker";

const ADD_ONE_PRODUCT = 1;
const REMOVE_ONE_PRODUCT = -1;

const QUANTITY_BUTTONS = [
  {
    icon: AddIcon,
    quantity: ADD_ONE_PRODUCT,
    color: "bg-green-500",
  },
  {
    icon: RemoveIcon,
    quantity: REMOVE_ONE_PRODUCT,
    color: "bg-red-500",
  },
];

const NewSale = () => {
  const {
    handleAddProduct,
    register,
    form,
    addedProducts,
    handleAddProductQuantity,
    totalAmount,
    stockProducts,
    search,
    isLoadingProducts,
    handleRemoveProduct,
    onSubmit,
  } = useNewSaleForm();

  // const data = useMemo(() => products ?? [], [products]);

  const NEW_SALE_ADDED_PRODUCTS_ACCESSORS: ColumnDef<SaleProductType>[] =
    useMemo(
      () => [
        {
          accessorKey: "name",
          header: "Nombre",
        },
        {
          accessorKey: "price",
          header: "Precio",
          cell: ({
            row: {
              original: { price },
            },
          }) => <div>${price}</div>,
        },
        {
          id: "subTotal",
          header: "PrecioTotal",
          cell: ({
            row: {
              original: { quantity, price },
            },
          }) => <div>${quantity * price}</div>,
        },
        {
          accessorKey: "quantity",
          header: "Cantidad",
          cell: ({ row: { index, original } }) => {
            return (
              <div className="flex items-center gap-2">
                <InputForm
                  name={`products.${index}.quantity`}
                  register={register}
                  label={""}
                  type="number"
                />
                {QUANTITY_BUTTONS.map(({ color, icon, quantity }) => {
                  const isDisabled = original.quantity + quantity === 0;

                  return (
                    <div
                      key={icon}
                      className={`${
                        isDisabled ? "bg-neutral-400" : color
                      } rounded-full cursor-pointer`}
                      onClick={() =>
                        !isDisabled &&
                        handleAddProductQuantity(original.id, quantity)
                      }
                    >
                      <SvgIcon icon={icon} color={TailwindColors.NEUTRAL50} />
                    </div>
                  );
                })}

                <div
                  className="bg-red-500 rounded-md cursor-pointer p-1"
                  onClick={() => handleRemoveProduct(original.id)}
                >
                  <SvgIcon
                    icon={DeleteForeverIcon}
                    size={20}
                    color={TailwindColors.NEUTRAL50}
                  />
                </div>
              </div>
            );
          },
        },
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [addedProducts, register]
    );

  const NEW_SALE_PRODUCTS_ACCESSORS: ColumnDef<ProductPopulatedType>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "price",
      header: "Precio",
    },
    {
      accessorKey: "quantityOnStock",
      header: "Stock",
    },
    {
      id: "actions",
      cell: ({ row: { original } }) => {
        const isDisabled = original.quantityOnStock <= 0;

        return (
          <div className="flex justify-end">
            <div
              onClick={() => !isDisabled && handleAddProduct(original)}
              className={`${
                isDisabled ? "bg-neutral-400" : "bg-green-500"
              } w-fit rounded-full cursor-pointer`}
            >
              <SvgIcon icon={AddIcon} color={TailwindColors.NEUTRAL50} />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h1>Nueva Venta</h1>
      {/* // TODO: fix grid layout */}
      <FormProvider {...form}>
        <form
          className="grid grid-cols-[repeat(2,1fr)] grid-rows-[auto_60vh_20vh] gap-x-8 gap-y-4"
          onSubmit={onSubmit}
        >
          <div className="flex gap-4 items-center">
            <Input placeholder="Buscar producto..." {...search} />
            <div className="rounded-sm aspect-square h-full grid place-items-center bg-neutral-200 border border-neutral-400">
              <SvgIcon
                icon={BarcodeScannerIcon}
                size={30}
                color={TailwindColors.NEUTRAL600}
              />
            </div>
          </div>
          <div className="ml-auto text-4xl">{totalAmount}$</div>
          <Table
            columns={NEW_SALE_PRODUCTS_ACCESSORS}
            data={stockProducts}
            isLoading={isLoadingProducts}
          />
          <Table
            columns={NEW_SALE_ADDED_PRODUCTS_ACCESSORS}
            data={addedProducts}
            isLoading={false}
          />
          <div className="flex gap-4 items-start">
            <SelectInput
              label={"Metodo de Pago"}
              placeholder="Seleccione Metodo de Pago"
              name={"paymentMethod"}
              register={register}
              options={PAYMENT_METHODS_OPTIONS}
            />
            <SelectInput
              label={"Estado de la Compra"}
              placeholder="Seleccione Estado de la Compra"
              name={"status"}
              register={register}
              options={SALE_STATUS_OPTIONS}
            />
            <DatePicker
              label="Fecha"
              name="date"
              register={register}
              // defaultValue={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Guardar Venta</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default NewSale;
