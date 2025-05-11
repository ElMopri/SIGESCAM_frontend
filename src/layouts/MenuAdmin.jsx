import Menu from "../components/Menu";
import { FaShoppingCart, FaCommentAlt,  FaUser } from "react-icons/fa";
import{BiSolidHome} from "react-icons/bi";
import{GiReceiveMoney} from "react-icons/gi";
import{ImStatsBars} from "react-icons/im";
import{IoSettingsSharp} from "react-icons/io5";


const MenuAdmin = ({ isOpen }) => {
  const menuItems = [
    { text: "Inicio", path: "/admin/inicio", icon:<BiSolidHome />},
    { text: "Productos", path: "/admin/productos",icon: <FaShoppingCart /> },
    { text: "Por Cobrar", path: "/admin/por-cobrar", icon:<GiReceiveMoney />},
    { text: "Sugerencias", path: "/admin/sugerencias",icon:<FaCommentAlt /> },
    { text: "Estadísticas", path: "/admin/estadisticas",icon:<ImStatsBars />  },
    { text: "Usuarios", path: "/admin/usuarios", icon: <FaUser />},
    { text: "Ajustes", path: "/admin/ajustes", icon: <IoSettingsSharp />},
  ];

  const handleLogout = () => {
    // luego pongo lo de cerrar sesión acá
  };

  return (
    <Menu
      menuItems={menuItems}
      role="admin"
      handleLogout={handleLogout}
      isOpen={isOpen}
    />
  );
};

export default MenuAdmin;
