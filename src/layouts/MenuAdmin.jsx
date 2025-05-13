import React from "react";
import Menu from "../components/Menu";
import { FaShoppingCart, FaCommentAlt, FaUser } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { ImStatsBars } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";

const MenuAdmin = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { text: "Inicio", path: "/admin", icon: <BiSolidHome /> },
    { text: "Productos", path: "/admin/productos", icon: <FaShoppingCart /> },
    { text: "Por cobrar", path: "/admin/por-cobrar", icon: <GiReceiveMoney /> },
    { text: "Sugerencias", path: "/admin/sugerencias", icon: <FaCommentAlt /> },
    {
      text: "Estadísticas",
      path: "/admin/estadisticas",
      icon: <ImStatsBars />,
    },
    { text: "Usuarios", path: "/admin/usuarios", icon: <FaUser /> },
    { text: "Ajustes", path: "/admin/ajustes", icon: <IoSettingsSharp /> },
  ];

  return (
    <Menu
      menuItems={menuItems}
      role="admin"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

export default MenuAdmin;
