
import { FaBell } from "react-icons/fa";
import "./HeaderUser.css";

const HeaderUser = ({ nombre = "Nombre del Usuario" }) => {
  return (
    <header className="header-user">
      <button className="notificacion-btn">
        <FaBell size={18} />
      </button>

      <div className="usuario-info">
        <div className="foto-usuario">
          <img
            src="/user.png"
            alt="Foto de usuario"
            className="imagen-usuario"
          />
        </div>
        <span className="nombre-usuario">{nombre}</span>
      </div>
    </header>
  );
};

export default HeaderUser;
