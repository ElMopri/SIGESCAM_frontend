import React from "react";
import Menu from "../components/Menu";

import { FaShoppingCart, FaCommentAlt,  FaUser } from "react-icons/fa";
import{BiSolidHome} from "react-icons/bi";
import{GiReceiveMoney} from "react-icons/gi";
import { MdPointOfSale } from "react-icons/md";

const MenuGestor = ({ isOpen }) => {
  const menuItems = [
    { text: "Inicio", path: "/gestorDeVentas/inicio", icon:<BiSolidHome /> },
    { text: "Productos", path: "/gestorDeVentas/ventas", icon: <FaShoppingCart />},
    { text: "Por Cobrar", path: "/gestorDeVentas/devoluciones", icon:<GiReceiveMoney /> },
    { text: "Sugerencias", path: "/gestorDeVentas/clientes" ,icon:<FaCommentAlt />},
    { text: "Registrar Venta", path: "/gestorDeVentas/estadisticas",icon:<MdPointOfSale /> },
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
