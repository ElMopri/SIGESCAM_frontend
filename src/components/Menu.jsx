import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Menu.css";
import { IoLogOut } from "react-icons/io5";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Menu = ({ menuItems, role, handleLogout, isOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };
  return (
    <div className={`menu-container ${isOpen ? "open" : "closed"}`}>
      <div className={`${role}-menu`}>
        <div className={`${role}-profile`}>
          <img src="/logo.png" alt="Logo" className="menu-logo" />
          <h2 className="nombre">
            {user?.nombre ? `Hola ${user.nombre}` : "Hola, nombre del usuario"}
          </h2>
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <Link to={item.path} key={item.text}>
              <Button text={item.text} icon={item.icon} />
            </Link>
          ))}
        </nav>
        <br />
        <button className="logout-button" onClick={cerrarSesion}>
          <span>Salir </span>
          <IoLogOut className="salir-button" />
        </button>
      </div>
    </div>
  );
};

export default Menu;
