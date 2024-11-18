import { PaymentMethodsEnum, SaleStatusEnum } from "@globalTypes/types";
import {
  CreditCardIcon,
  HelpIcon,
  LanguageIcon,
  PaymentsIcon,
} from "./assets/svg";

export const PAYMENT_METHODS_OPTIONS: {
  label: string;
  value: PaymentMethodsEnum;
}[] = [
  { label: "Efectivo", value: PaymentMethodsEnum.CASH },
  { label: "Tarjeta de crédito", value: PaymentMethodsEnum.CREDIT_CARD },
  { label: "Tarjeta de débito", value: PaymentMethodsEnum.DEBIT_CARD },
  { label: "Online", value: PaymentMethodsEnum.ONLINE },
  { label: "Otro", value: PaymentMethodsEnum.OTHER },
];

export const PAYMENT_METHODS_OBJECT: Record<
  PaymentMethodsEnum,
  { label: string; icon: string }
> = {
  [PaymentMethodsEnum.CASH]: { label: "Efectivo", icon: PaymentsIcon },
  [PaymentMethodsEnum.CREDIT_CARD]: {
    label: "Tarjeta de crédito",
    icon: CreditCardIcon,
  },
  [PaymentMethodsEnum.DEBIT_CARD]: {
    label: "Tarjeta de débito",
    icon: CreditCardIcon,
  },
  [PaymentMethodsEnum.ONLINE]: { label: "Online", icon: LanguageIcon },
  [PaymentMethodsEnum.OTHER]: { label: "Otro", icon: HelpIcon },
};

export const SALE_STATUS_OPTIONS: { label: string; value: SaleStatusEnum }[] = [
  { label: "Completado", value: SaleStatusEnum.COMPLETED },
  { label: "Pendiente", value: SaleStatusEnum.PENDING },
  { label: "Cancelado", value: SaleStatusEnum.CANCELED },
  { label: "Reembolsado", value: SaleStatusEnum.REFUNDED },
];
