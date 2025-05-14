import React, { useState, useEffect } from "react";
import TablaNotificaciones from "../../components/TablaNotificaciones.jsx";
import { obtenerNotificaciones, actualizarEstadoNotificacion } from "../../api/NotificacionApi.js";



export default function Notificaciones() {

  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(null);
  
  useEffect(() => {
    const cargarNotificaciones = async () => {
      const dni = localStorage.getItem("usuario_dni"); 
      if (!dni) return;

      const data = await obtenerNotificaciones(dni);
      console.log("Datos cargados desde backend:", data);
      setNotificaciones(data);
    };

    cargarNotificaciones();
  }, []);

  const marcarComoLeida = async (id) => {
    setCargando(id);
    try {
      const notificacionActualizada = await actualizarEstadoNotificacion(id);
      
      setNotificaciones(prev =>
        prev.map(n => n.id === id ? { ...n, leida: true } : n)
      );
    } catch (error) {
      console.error("Error al marcar como leída:", error);
    } finally {
      setCargando(null);
    }
  };

  return (
    <div className="notificaciones-container">
      <div className="notificaciones-header">
        <h2>Notificaciones</h2>
        <span className="notificaciones-fecha">
          {new Date().toLocaleDateString("es-CO", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </span>
      </div>

      <TablaNotificaciones
        notificaciones={notificaciones}
        marcarComoLeida={marcarComoLeida}
        cargando={cargando}
      />
    </div>
  );
}
