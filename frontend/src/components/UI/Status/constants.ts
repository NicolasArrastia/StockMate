import { SaleStatusEnum } from "@globalTypes/types";
import {
  CancelIcon,
  CheckCircleIcon,
  ErrorIcon,
  ScheduleIcon,
} from "src/assets/svg";

export const config: Record<
  SaleStatusEnum,
  { color: string; label: string; icon: string }
> = {
  completed: {
    color: "bg-green-500",
    label: "Completado",
    icon: CheckCircleIcon,
  },
  canceled: {
    color: "bg-orange-500",
    label: "Cancelado",
    icon: CancelIcon,
  },
  pending: {
    color: "bg-yellow-500",
    label: "Pendiente",
    icon: ScheduleIcon,
  },
  refunded: {
    color: "bg-red-500",
    label: "Reembolsado",
    icon: ErrorIcon,
  },
};
