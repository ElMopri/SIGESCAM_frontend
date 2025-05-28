import React from "react";
import AjustesBase from "../../components/AjustesBase";

const AjustesGestor = ({ user, setUser }) => {
  const imagenPerfil = "/user.png";

  const notificaciones = [
    { id: "productos", label: "Activar notificaciones de productos" },
  ];

  return (
    <AjustesBase imagenPerfil={imagenPerfil} notificaciones={notificaciones} />
  );
};

export default AjustesGestor;
