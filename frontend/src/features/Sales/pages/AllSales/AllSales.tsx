import { useMemo } from "react";
import Table from "../../../../components/Table";
import useGetAllSales from "../../../../hooks/sales/useGetAllSales";
import { ColumnDef } from "@tanstack/react-table";
import { SaleType } from "@globalTypes/types";
import { SALES_TABLE_ACCESSORS_KEYS } from "./constants";
import Button from "src/components/Button";
import { useNavigate } from "react-router-dom";

const AllSales = () => {
  const { data: sales, isLoading } = useGetAllSales();

  const data = useMemo(() => sales ?? [], [sales]);

  const columns: ColumnDef<SaleType>[] = useMemo(
    () => SALES_TABLE_ACCESSORS_KEYS,
    []
  );

  const navigate = useNavigate();

  const handleNewSale = () => {
    navigate("new");
  };

  return (
    <>
      <h1>Ventas</h1>
      <header className="flex mb-2">
        <Button className="ml-auto" onClick={handleNewSale}>
          Nueva Venta
        </Button>
      </header>
      <Table columns={columns} data={data} isLoading={isLoading} />
    </>
  );
};

export default AllSales;
