// TODO: Make two types, one for the populated data and another without populated data
/*
  unpopulatedData
  category: string;
  tags: string[];

  populatedData
  category: CategoryType;
  tags: TagType[];
*/
export type ProductType = {
  _id: string;
  name: string;
  description: string;
  code?: string;
  category?: string | CategoryType;
  tags?: string[] | TagType[];

  quantityOnStock: number;
  lowQuantityWarning?: number;
  ignoreQuantity?: boolean;

  supplier?: string;

  price: number;
  costPrice: number;
  ignorePrice?: boolean;

  isActive: boolean;

  // expirationDate: unknown;
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
