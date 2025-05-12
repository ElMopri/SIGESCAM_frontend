import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { IoLogOut } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

const Menu = ({ menuItems, role, isOpen, setIsOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={menuRef}
      className={`menu-container ${isOpen ? "open" : "closed"}`}
    >
      <div className={`${role}-menu`}>
        <div className={`${role}-profile`}>
          <img src="/logo.png" alt="Logo" className="menu-logo" />
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.text}
              onClick={() => setIsOpen(false)} // Cierra al hacer clic en opción
            >
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
