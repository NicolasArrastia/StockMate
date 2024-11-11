export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;

  quantityOnStock: number;
  lowQuantityWarning?: number;

  code?: string;

  category?: string;
  tags?: string[];
  // expirationDate: unknown;
  // provider: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  description?: string;
  parent?: string;
};

export type TagType = {
  _id: string;
  name: string;
  color: string;
};
