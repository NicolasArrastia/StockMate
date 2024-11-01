import { useNavigate } from "react-router-dom";
import useProducts from "../../../../hooks/useGetProducts";
import Button from "../../../../components/Button";

const AllProducts = () => {
  const { data: products, isLoading, error } = useProducts();

  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("new");
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;

  return (
    <>
      <h1>Productos</h1>

      <div className="flex items-center justify-between">
        <div className="bg-neutral-400 text-neutral-700 rounded-md p-2 w-80">
          searchbar
        </div>

        <Button onClick={handleCreateProduct}>+ Producto</Button>
      </div>

      <ul>
        {!isLoading && products ? (
          <>
            {products.map((product) => (
              <li key={product._id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </>
        ) : (
          <>loading...</>
        )}
      </ul>
    </>
  );
};

export default AllProducts;
