import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Loader from "../Loader";

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading: boolean;
};

const Table = <TData,>({ columns, data, isLoading }: Props<TData>) => {
  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { getHeaderGroups, getRowModel } = tableInstance;

  const hasItems = !!tableInstance.getRowCount();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {hasItems ? (
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>No hay elementos para mostrar</span>
          )}
        </>
      )}
    </>
  );
};

export default Table;
