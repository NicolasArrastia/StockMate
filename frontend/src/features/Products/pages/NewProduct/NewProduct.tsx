import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import { ProductType } from "../../../../../../types";
import Input from "../../../../components/Input";
import useCreateProduct from "../../../../hooks/useCreateProduct";
import { toast } from "react-toastify";

type FormData = Partial<ProductType>;

const NewProduct = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { mutate } = useCreateProduct();

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Creado");
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  return (
    <form className="flex flex-col">
      <Input<FormData> label="Nombre" name="name" register={register} />
      <Input<FormData>
        label="Precio"
        name="price"
        register={register}
        type="number"
      />

      {/* <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          className="border rounded-md p-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          className="border rounded-md p-2"
        />
      </div> */}

      <footer className="flex gap-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button onClick={() => alert("reset")} variant="secondary" type="reset">
          Reset
        </Button>
      </footer>
    </form>
  );
};

export default NewProduct;
