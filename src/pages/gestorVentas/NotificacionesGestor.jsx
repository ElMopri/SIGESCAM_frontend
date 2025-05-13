import React, { useState } from "react";
import TablaNotificaciones from "../../components/TablaNotificaciones";

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
  const [notificaciones, setNotificaciones] = useState(listaDeNotificaciones);

  const marcarComoLeida = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
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
      />
    </div>
  );
}
