import {
  PaymentMethodsEnum,
  ProductPopulatedType,
  SaleStatusEnum,
  SaleType,
} from "@globalTypes/types";
import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGetAllProducts from "src/features/Products/hooks/useGetAllProducts";
import useCreateSale from "src/hooks/sales/useCreateSale";

// TODO: move hook
const useSearchInput = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleSearch(e.target.value);
  };

  return {
    value: search,
    onChange,
  };
};

type SaleFormFields = Partial<SaleType> & {
  _id: SaleType["_id"];
};

const useNewSaleForm = () => {
  const search = useSearchInput();

  const { data: products = [], isLoading: isLoadingProducts } =
    useGetAllProducts({
      search: search.value,
    });

  const form = useForm<SaleType>({
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd HH:mm"),
      // customerId: "",
      products: [],
      paymentMethod: PaymentMethodsEnum.CASH,
      status: SaleStatusEnum.COMPLETED,
    },
  });
  const { setValue, getValues, handleSubmit } = form;

  const navigate = useNavigate();
  const { mutate } = useCreateSale({
    onSuccess: () => {
      toast.success("Venta creada con éxito");
      navigate("/sales");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutate(formData);
  });

  const handleAddProduct = useCallback(
    (newProduct: ProductPopulatedType) => {
      const isAlreadyAdded = form
        .getValues("products")
        .some((p) => p.id === newProduct._id);

      const product = {
        id: newProduct._id,
        name: newProduct.name,
        price: newProduct.price,
      };

      const newProductsList: SaleType["products"] = isAlreadyAdded
        ? form
            .getValues("products")
            .map((p) =>
              p.id === product.id
                ? { ...p, quantity: Number(p.quantity) + 1 }
                : p
            )
        : [...form.getValues("products"), { ...product, quantity: 1 }];

      setValue("products", newProductsList);
    },
    [form, setValue]
  );

  const handleAddProductQuantity = useCallback(
    (id: string, quantity: number) => {
      const newProductsList = getValues("products").map((product) =>
        product.id === id
          ? { ...product, quantity: Number(product.quantity) + quantity }
          : product
      );

      setValue("products", newProductsList);
    },
    [getValues, setValue]
  );

  const addedProducts = form.watch("products");

  const handleRemoveProduct = (id: string) => {
    const updatedProducts = form
      .getValues("products")
      .filter((p) => p.id !== id);
    setValue("products", updatedProducts);
  };

  const stockProducts: ProductPopulatedType[] = useMemo(() => {
    return products.map((stockProduct) => {
      const addedProduct = addedProducts.find(
        (formProduct) => formProduct.id === stockProduct._id
      );
      return addedProduct
        ? {
            ...stockProduct,
            quantityOnStock:
              stockProduct.quantityOnStock - addedProduct.quantity,
          }
        : stockProduct;
    });
  }, [addedProducts, products]);

  const totalAmount = getValues("products").reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return {
    form,
    ...form,
    handleAddProduct,
    handleAddProductQuantity,
    stockProducts,
    addedProducts,
    totalAmount,
    search,
    isLoadingProducts,
    handleRemoveProduct,
    onSubmit,
  };
};

export default useNewSaleForm;
