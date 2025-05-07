import { Link } from "react-router-dom";
import "./Inicio.css";

const Inicio = () => {
  return (
    <div className="pagina-inicio">
      <header className="header">
        <div className="logo-container">
          <h1 className="titulo-inicio">Variedades Carmencita</h1>
        </div>
        <Link to="/login">
          <button className="boton-iniciar-sesion">Iniciar sesión</button>
        </Link>
      </header>
      <main className="contenido-inicio">
        <p>Bienvenido a nuestra tienda en línea. ¡Comienza a explorar!</p>
      </main>
    </div>
  );
};

export default Inicio;
