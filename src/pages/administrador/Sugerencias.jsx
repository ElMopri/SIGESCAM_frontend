import React, { useState, useEffect } from "react";
import "./Sugerencias.css";

import InputSugerencia from "../../components/InputSugerencia.jsx";
import TabsSugerencias from "../../components/TabsSugerencia.jsx";
import TarjetaSugerencia from "../../components/TarjetaSugerencia.jsx";
import ModalSugerencia from "../../components/ModalSugerencia.jsx";

import {
  obtenerSugerencias,
  registrarSugerencia,
  actualizarEstadoSugerencia
} from "../../api/SugerenciasApi.js";

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState([]);
  const [modalTipo, setModalTipo] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerSugerencias();
      if (datos) setSugerencias(datos);
    };
    cargarDatos();
  }, []);

  const agregarSugerencia = async (nueva) => {
    if (!nueva.nombre_producto?.trim() || !nueva.descripcion?.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const creada = await registrarSugerencia(nueva);
    if (creada) {
      setSugerencias((prev) => [...prev, creada]);
    } else {
      alert("No se pudo registrar la sugerencia");
    }
  };

  const cambiarEstado = async (id_sugerencia, nuevoEstado) => {
  const actualizada = await actualizarEstadoSugerencia(id_sugerencia, nuevoEstado);
  if (actualizada) {
    setSugerencias((prev) =>
      prev.map((s) =>
        s.id_sugerencia === id_sugerencia ? actualizada : s
      )
    );
    alert("Operción exitosa.")
  } else {
    alert("No se pudo actualizar el estado");
  }
};

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
        <label>Sugerencias Pendientes</label>
      </div>

      <div className="grid-sugerencias">
        {sugerenciasPendientes.map((sug) => (
          <TarjetaSugerencia
            key={sug.id_sugerencia}
            sugerencia={sug}
            onAceptar={() => cambiarEstado(sug.id_sugerencia, "aceptada")}
            onRechazar={() => cambiarEstado(sug.id_sugerencia, "rechazada")}
          />
        ))}
      </div>

      {modalTipo && (
        <ModalSugerencia
          tipo={modalTipo}
          sugerencias={
            modalTipo === "aceptada" ? sugerenciasAceptadas : sugerenciasRechazadas
          }
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
