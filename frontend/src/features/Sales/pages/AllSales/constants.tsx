import SvgIcon from "src/components/SvgIcon";
import { SaleType } from "@globalTypes/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { DeleteForeverIcon, EditIcon } from "src/assets/svg";
import Status from "src/components/UI/Status";
import { TailwindColors } from "src/features/Settings/components/Categories/enums";
import { PAYMENT_METHODS_OBJECT } from "src/constants";

export const SALES_TABLE_ACCESSORS_KEYS: ColumnDef<SaleType>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({
      row: {
        original: { date },
      },
    }) => {
      const formattedDate = formatDate(new Date(date), "MM/dd/yyyy");
      return formattedDate;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => {
      return `$ ${totalAmount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Metodo de Pago",
    cell: ({
      row: {
        original: { paymentMethod },
      },
    }) => {
      const { label, icon } = paymentMethod
        ? PAYMENT_METHODS_OBJECT[paymentMethod]
        : { label: "-" };

      return (
        <div className="flex gap-1">
          {icon && <SvgIcon icon={icon} color={TailwindColors.NEUTRAL500} />}
          <span className="text-neutral-500">{label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({
      row: {
        original: { status },
      },
    }) => <Status status={status} />,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <SvgIcon icon={EditIcon} color={TailwindColors.NEUTRAL500} />
          <SvgIcon icon={DeleteForeverIcon} color={TailwindColors.RED500} />
        </div>
      );
    },
  },
];
