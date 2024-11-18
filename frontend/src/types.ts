import { ReactElement } from "react";
import { ButtonVariant } from "./components/Button/Button";

export type RouteType = {
  path: string;
  element: ReactElement;
};

export type ButtonType = {
  label: string | JSX.Element;
  onClick: () => void;
  variant?: ButtonVariant;
};
