import React from "react";
import Menu from "../components/Menu";

import { FaShoppingCart, FaCommentAlt, FaUser } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdPointOfSale } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const MenuGestor = ({ isOpen }) => {
  const menuItems = [
    { text: "Inicio", path: "/gestorDeVentas/inicio", icon: <BiSolidHome /> },
    {
      text: "Productos",
      path: "/gestorDeVentas/productos",
      icon: <FaShoppingCart />,
    },
    {
      text: "Por Cobrar",
      path: "/gestorDeVentas/por-cobrar",
      icon: <GiReceiveMoney />,
    },
    {
      text: "Sugerencias",
      path: "/gestorDeVentas/sugerencias",
      icon: <FaCommentAlt />,
    },
    {
      text: "Registrar Venta",
      path: "/gestorDeVentas/registar-venta",
      icon: <MdPointOfSale />,
    },
    {
      text: "Ajustes",
      path: "/gestorDeVentas/ajustes",
      icon: <IoSettingsSharp />,
    },
  ];

  const handleLogout = () => {
    // Aquí puedes añadir la lógica de cierre de sesión
  };

  return (
    <Menu
      menuItems={menuItems}
      role="gestor"
      handleLogout={handleLogout}
      isOpen={isOpen}
    />
  );
};

export default MenuGestor;
