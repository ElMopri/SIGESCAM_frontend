import React from "react";
import AjustesBase from "../../components/AjustesBase";

const Ajustes = () => {
  const imagenPerfil = "https://randomuser.me/api/portraits/women/65.jpg";

  const notificaciones = [
    { id: "sugerencias", label: "Activar notificaciones de sugerencias" },
    { id: "productos", label: "Activar notificaciones de productos" },
  ];

  return (
    <AjustesBase imagenPerfil={imagenPerfil} notificaciones={notificaciones} />
  );
};

export default Ajustes;
