import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./Menu.css";
import {IoLogOut} from "react-icons/io5"

const Menu = ({ menuItems, role, handleLogout, isOpen }) => {
  return (
    <div className={`menu-container ${isOpen ? "open" : "closed"}`}>
      <div className={`${role}-menu`}>
        <div className={`${role}-profile`}>

        <img
          src="/logo.jpg"
          alt="Logo"
          className="menu-logo"
        />

          <h2 className="nombre">
            {role === "admin" ? "Administrador" : "Gestor de Ventas"}
          </h2>
          
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <Link to={item.path} key={item.text}>
              <Button text={item.text}  icon={item.icon}/>
            </Link>
          ))}
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <IoLogOut />
          <span>salir</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
