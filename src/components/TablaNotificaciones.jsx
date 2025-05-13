import React from "react";
import "./TablaNotificaciones.css";
import { FaRegBell } from "react-icons/fa";
import { PiCardholderBold } from "react-icons/pi";

function TablaNotificaciones({ notificaciones, marcarComoLeida, cargando }) {
  const getColorFondo = (index) => (index % 2 === 0 ? "color-fondo-uno" : "color-fondo-dos");

  return (
  <div className="notificaciones-panel">
    <div className="notificaciones-campana">
      <FaRegBell />
    </div>
    {notificaciones.map((noti, index) => (
      <div key={noti.id} className={`notificacion-item ${getColorFondo(index)}`}>
        <div className="notificacion-mensaje">
          <div className="notificaciones-carta"><PiCardholderBold /></div>
          {noti.leida ? noti.descripcion : <strong>{noti.descripcion}</strong>}
        </div>
        <div>
          {noti.leida ? (
            <span className="btn-leida">Leída</span>
          ) : (
            <button
                onClick={() => marcarComoLeida(noti.id)}
                className="btn-marcar"
                disabled={cargando === noti.id}
              >
                {cargando === noti.id ? "Procesando..." : "Marcar como leída"}
              </button>

          )}
        </div>
      </div>
    ))}
  </div>
  );
}

export default TablaNotificaciones;