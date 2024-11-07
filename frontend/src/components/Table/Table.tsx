import { flexRender, Table as TableType } from "@tanstack/react-table";
import Loader from "../Loader";

type Props<TData> = {
  tableInstance: TableType<TData>;
  isLoading: boolean;
};

const Table = <TData,>({ tableInstance, isLoading }: Props<TData>) => {
  const { getHeaderGroups, getRowModel } = tableInstance;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="border w-full">
          <thead className="bg-neutral-400">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="first:text-left px-4 py-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-neutral-200 hover:bg-neutral-300 group group/row"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
