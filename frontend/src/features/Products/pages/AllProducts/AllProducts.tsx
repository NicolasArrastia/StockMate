import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { useState } from "react";
import useSearchProducts from "../../hooks/useSearchProducts";
import useProducts from "../../hooks/useGetProducts";

const AllProducts = () => {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchProducts } = useSearchProducts(searchTerm);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("new");
  };

  const renderContent = () => {
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los productos: {error.message}</div>;

    const displayedProducts = searchTerm ? searchProducts : products;

    return (
      <ul>
        {displayedProducts?.map((product) => (
          <li key={product._id} className="flex">
            <Link to={product._id} className="underline text-blue-500 mr-2">
              Edit
            </Link>
            <Button onClick={() => {}}>Delete</Button>
            <span>
              {product.name} - ${product.price}
            </span>
          </li>
        )) || <div>No hay productos disponibles.</div>}
      </ul>
    );
  };

  return (
    <>
      <h1>Productos</h1>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md p-2 mb-4"
        />
        <Button onClick={handleCreateProduct}>+ Producto</Button>
      </div>
      {renderContent()}
    </>
  );
};

export default AllProducts;
