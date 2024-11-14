import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { useCallback, useMemo, useState } from "react";
import useGetAllProducts from "../../hooks/useGetAllProducts.ts";
import { ProductPopulatedType } from "@globalTypes/types.ts";
import { ColumnDef } from "@tanstack/react-table";
import SvgIcon from "../../../../components/SvgIcon";
import {
  DeleteForeverIcon,
  EditIcon,
  WarningIcon,
} from "../../../../assets/svg";
import TruncatedText from "../../../../components/TruncatedText";
import Category from "../../../../components/UI/Category/Category.tsx";
import Input from "../../../../components/UI/Input/Input.tsx";
import Table from "../../../../components/Table";

const AllProducts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading } = useGetAllProducts({
    search,
  });

  console.count("AllProducts");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleCreateProduct = () => {
    navigate("new");
  };

  // const { mutate } = useDeleteProduct({
  //   onSuccess: () => {
  //     toast.success("Producto borrado");
  //     queryClient.invalidateQueries({ queryKey: [GET_ALL_PRODUCTS_KEY] });
  //   },
  // });

  const handleEditRedirect = useCallback(
    (id: ProductPopulatedType["_id"]) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  const handleDeleteModal = () => {
    // TODO: add delete modal
    alert("TODO");
  };

  const columns: ColumnDef<ProductPopulatedType>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
      },
      { accessorKey: "price", header: "Precio" },
      {
        accessorKey: "description",
        header: "Descripción",
        cell: ({
          row: {
            original: { description },
          },
        }) => <TruncatedText text={description} />,
      },
      {
        accessorKey: "category",
        header: "Categoría",
        cell: ({
          row: {
            original: { category },
          },
        }) => {
          return category ? (
            <Category name={category.name} />
          ) : (
            <span className="text-neutral-400 italic">no hay categoría</span>
          );
        },
      },
      {
        // accessorKey: "quantityOnStock",
        header: "Cantidad",
        // id: "quantityOnStock",
        cell: ({
          row: {
            original: { quantityOnStock, lowQuantityWarning },
          },
        }) => {
          const isStockWarning = quantityOnStock <= lowQuantityWarning;
          return (
            <span
              className={`${
                isStockWarning && "text-orange-500 font-semibold"
              } flex items-center gap-2`}
            >
              {quantityOnStock}
              {isStockWarning && <SvgIcon icon={WarningIcon} size={20} />}
            </span>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <SvgIcon
              className="!bg-red-500 cursor-pointer"
              icon={DeleteForeverIcon}
              onClick={handleDeleteModal}
            />
            <SvgIcon
              className="!bg-neutral-500 cursor-pointer"
              icon={EditIcon}
              onClick={() => handleEditRedirect(row.original._id)}
            />
          </div>
        ),
      },
    ],
    [handleEditRedirect]
  );

  const data = useMemo(() => products, [products]);

  return (
    <>
      <h1>Productos</h1>
      <div className="flex items-center justify-between mb-2">
        <Input
          placeholder="Buscar por Nombre, Descripción"
          value={search}
          className="!w-80"
          onChange={handleSearch}
        />
        <Button onClick={handleCreateProduct}>Agregar Producto</Button>
      </div>

      <Table columns={columns} data={data} isLoading={isLoading} />
    </>
  );
};

export default AllProducts;
