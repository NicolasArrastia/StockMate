import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className="text-4xl">Ha ocurrido un problema</h1>
      <span>El sitio al que quiere acceder no existe</span>

      <div className="flex gap-4">
        <span
          onClick={handleGoBack}
          className="underline text-blue-500 cursor-pointer"
        >
          Volver al sitio anterior
        </span>
        <Link to="/" className="underline text-blue-500">
          Volver al inicio
        </Link>
      </div>
      {/* // TODO: add reportar error */}
    </div>
  );
};

export default NotFound;
