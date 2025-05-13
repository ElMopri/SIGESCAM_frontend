import React from "react";
import AjustesBase from "../../components/AjustesBase";

const AjustesGestor = ({ user, setUser }) => {
  const imagenPerfil = "https://randomuser.me/api/portraits/women/65.jpg";

  const notificaciones = [
    { id: "productos", label: "Activar notificaciones de productos" },
  ];

  return (
    <AjustesBase imagenPerfil={imagenPerfil} notificaciones={notificaciones} />
  );
};

export default AjustesGestor;
