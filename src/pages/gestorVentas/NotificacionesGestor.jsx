import React, { useState, useEffect  } from "react";
import TablaNotificaciones from "../../components/TablaNotificaciones.jsx";
import { obtenerNotificacionesGestora , actualizarEstadoNotificacion } from "../../api/NotificacionApi.js";

const listaDeNotificaciones = [
  { id: 1, descripcion: "Producto Cuaderno ha sido agregado al inventario", leida: true },
  { id: 2, descripcion: "Producto Carpeta yoyo ha sido agregado al inventario", leida: false },
  { id: 3, descripcion: "Producto Block bond está a punto de agotarse", leida: false },
  { id: 4, descripcion: "Producto Lapiz marfil h2 negro está a punto de agotarse", leida: false },
  { id: 5, descripcion: "Producto Marcador permanente negro ha sido agregado al inventario", leida: false },
  { id: 6, descripcion: "Producto Caja de temperas está a punto de agotarse", leida: false },
  { id: 7, descripcion: "Producto Borrador nata está a punto de agotarse", leida: false },
  { id: 8, descripcion: "Producto Peluches medianos está a punto de agotarse", leida: false },
  { id: 9, descripcion: "Producto Llaveros de peluche está a punto de agotarse", leida: false }
];

export default function NotificacionesGestor() {
  const [notificaciones, setNotificaciones] = useState([]);
    const [cargando, setCargando] = useState(null);

    useEffect(() => {
        const cargarNotificaciones = async () => {
          const dni = localStorage.getItem("usuario_dni"); 
          if (!dni) return;
    
          const data = await obtenerNotificacionesGestora(dni);
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
