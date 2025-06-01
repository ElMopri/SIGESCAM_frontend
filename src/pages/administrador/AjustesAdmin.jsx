import React, {useMemo} from "react";
import AjustesBase from "../../components/AjustesBase";

const Ajustes = () => {
  const imagenPerfil = "/user.png";

  const notificaciones = useMemo(() => [
    { id: "sugerencias", label: "Notificaciones de sugerencias" },
    { id: "productos", label: "Notificaciones de Stock" },
  ], []);

  return (
    <AjustesBase imagenPerfil={imagenPerfil} notificaciones={notificaciones} />
  );
};

export default Ajustes;
