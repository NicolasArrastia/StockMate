import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { useCallback, useMemo, useState } from "react";
import useGetAllProducts from "../../hooks/useGetAllProducts.ts";
import Table from "../../../../components/Table";
import { ProductPopulatedType } from "@types/types.ts";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SvgIcon from "../../../../components/SvgIcon";
import {
  DeleteForeverIcon,
  EditIcon,
  WarningIcon,
} from "../../../../assets/svg";
import TruncatedText from "../../../../components/TruncatedText";
import Category from "../../../../components/UI/Category/Category.tsx";

const AllProducts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading } = useGetAllProducts({
    search,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1>Productos</h1>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Buscar por Nombre, Descripción..."
          value={search}
          onChange={handleSearch}
          className="border rounded-md p-2 mb-4 w-80"
        />
        <Button onClick={handleCreateProduct}>Agregar Producto</Button>
      </div>

      <Table tableInstance={tableInstance} isLoading={isLoading} />
    </>
  );
};

export default AllProducts;
