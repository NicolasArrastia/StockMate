import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { useMemo, useState } from "react";
import useSearchProducts from "../../hooks/useSearchProducts";
import useGetProducts from "../../hooks/useGetProducts";
import Table from "../../../../components/Table";
import { ProductType } from "../../../../../../types";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SvgIcon from "../../../../components/SvgIcon";
import { DeleteForeverIcon, EditIcon } from "../../../../assets/svg";
import TruncatedText from "../../../../components/TruncatedText";

const AllProducts = () => {
  const { data: products, isLoading } = useGetProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchProducts } = useSearchProducts(searchTerm);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("new");
  };

  // const { mutate } = useDeleteProduct({
  //   onSuccess: () => {
  //     toast.success("Producto borrado");
  //     queryClient.invalidateQueries({ queryKey: [GET_ALL_PRODUCTS_KEY] });
  //   },
  // });

  const handleEditRedirect = (id: ProductType["_id"]) => {
    navigate(`/products/${id}`);
  };

  const handleDeleteModal = () => {
    // TODO: add delete modal
    alert("TODO");
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    { accessorKey: "price", header: "Precio" },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({
        row: {
          original: { description },
        },
      }) => <TruncatedText text={description} />,
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
  ];

  const displayedProducts = useMemo(
    () => (searchTerm ? searchProducts : products) || [],
    [products, searchProducts, searchTerm]
  );

  const tableInstance = useReactTable({
    data: displayedProducts,
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
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md p-2 mb-4 w-80"
        />
        <Button onClick={handleCreateProduct}>+ Producto</Button>
      </div>

      <Table tableInstance={tableInstance} isLoading={isLoading} />
    </>
  );
};

export default AllProducts;
