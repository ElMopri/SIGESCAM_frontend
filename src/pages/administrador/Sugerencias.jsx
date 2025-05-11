import React, { useState } from "react";
import InputSugerencia from "./InputSugerencia";
import TabsSugerencias from "./TabsSugerencia";
import TarjetaSugerencia from "./TarjetaSugerencia";
import ModalSugerencias from "./ModalSugerencia";
import "./Sugerencias.css";

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState([]);
  const [modalTipo, setModalTipo] = useState(null); // null, 'aceptada', 'rechazada'

  // Agregar sugerencia nueva como pendiente
  const agregarSugerencia = (nueva) => {
    setSugerencias([...sugerencias, { ...nueva, estado: "pendiente" }]);
  };

  // Cambiar estado de sugerencia
  const cambiarEstado = (id, nuevoEstado) => {
    setSugerencias((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  // Filtrados
  const sugerenciasPendientes = sugerencias.filter((s) => s.estado === "pendiente");
  const sugerenciasAceptadas = sugerencias.filter((s) => s.estado === "aceptada");
  const sugerenciasRechazadas = sugerencias.filter((s) => s.estado === "rechazada");

  return (
    <div className="sugerencias-admin">
      <InputSugerencia onAgregar={agregarSugerencia} />
      <TabsSugerencias
        onVerAceptadas={() => setModalTipo("aceptada")}
        onVerRechazadas={() => setModalTipo("rechazada")}
      />

      <div className="label-sugerencia">
      <label>Sugerencias Pendientes</label> </div>
      <div className="grid-sugerencias">
        {sugerenciasPendientes.map((sug) => (
          <TarjetaSugerencia
            key={sug.id}
            sugerencia={sug}
            onAceptar={() => cambiarEstado(sug.id, "aceptada")}
            onRechazar={() => cambiarEstado(sug.id, "rechazada")}
          />
        ))}
      </div>

      {modalTipo && (
        <ModalSugerencias
          tipo={modalTipo}
          sugerencias={modalTipo === "aceptada" ? sugerenciasAceptadas : sugerenciasRechazadas}
          onCerrar={() => setModalTipo(null)}
          onMover={(id) =>
            cambiarEstado(id, modalTipo === "aceptada" ? "rechazada" : "aceptada")
          }
        />
      )}
    </div>
  );
};

export default Sugerencias;
