export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;

  // TODO
  // quantity: number;
  // quantityWarning: number;

  // barcode: number | string;
  // category: string; // category.id or category.name
  // tags: string[] | { label: string; color: string }[];
  // expirationDate: unknown;
};

export type CategoryType = {
  _id: string;
  name: string;
  description: string;
  parent: unknown;
};
