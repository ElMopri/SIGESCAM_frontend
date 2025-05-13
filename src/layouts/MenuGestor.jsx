import React from "react";
import Menu from "../components/Menu";
import { FaShoppingCart, FaCommentAlt } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdPointOfSale } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const MenuGestor = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { text: "Inicio", path: "/gestorDeVentas", icon: <BiSolidHome /> },
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

  return (
    <Menu
      menuItems={menuItems}
      role="gestor"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

export default MenuGestor;
