import React from "react";
import AjustesBase from "../../components/AjustesBase";

const Ajustes = () => {
  const imagenPerfil = "https://randomuser.me/api/portraits/women/65.jpg";

  const notificaciones = [
    { id: "sugerencias", label: "Notificaciones de sugerencias" },
    { id: "productos", label: "Notificaciones de Stock" },
  ];

  return (
    <AjustesBase imagenPerfil={imagenPerfil} notificaciones={notificaciones} />
  );
};

export default Ajustes;
