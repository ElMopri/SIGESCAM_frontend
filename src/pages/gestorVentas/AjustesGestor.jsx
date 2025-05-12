import React from "react";
import AjustesBase from "../../components/AjustesBase";

const AjustesGestor = () => {
  const notificacionesGestor = [
    { key: "productos", label: "Activar notificaciones de productos" },
    { key: "ventas", label: "Notificar nuevas ventas" },
  ];

  return <AjustesBase rol="Gestor" notificaciones={notificacionesGestor} />;
};

export default AjustesGestor;
