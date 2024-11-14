export type ProductType = {
  _id: string;
  name: string;
  description: string;
  code?: string;
  category?: string;
  tags?: string[];

  quantityOnStock: number;
  lowQuantityWarning: number;
  ignoreQuantity: boolean;

  supplier?: string;

  price: number;
  costPrice: number;
  ignorePrice: boolean;

  isActive: boolean;

  // expirationDate: unknown;
};

export type ProductPopulatedType = Omit<
  ProductType,
  "category" | "tags" | "supplier"
> & {
  category?: CategoryType;
  tags: TagType[];
  supplier?: SupplierType;
};

export type SupplierType = {
  _id: string;
  name: string;
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
