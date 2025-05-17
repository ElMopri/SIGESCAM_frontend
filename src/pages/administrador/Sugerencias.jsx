"use client"

import { useState, useEffect } from "react"
import "./Sugerencias.css"

import InputSugerencia from "../../components/InputSugerencia.jsx"
import TabsSugerencias from "../../components/TabsSugerencia.jsx"
import TarjetaSugerencia from "../../components/TarjetaSugerencia.jsx"
import ModalSugerencia from "../../components/ModalSugerencia.jsx"
import Modal from "../../components/Modal.jsx" // Importamos el componente Modal

import { obtenerSugerencias, registrarSugerencia, actualizarEstadoSugerencia } from "../../api/SugerenciasApi.js"

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState([])
  const [modalTipo, setModalTipo] = useState(null)

  // Estados para el modal de notificación
  const [modalNotificacion, setModalNotificacion] = useState({
    isOpen: false,
    type: "success", // success, error, confirm
    title: "",
    message: "",
  })

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerSugerencias()
      if (datos) setSugerencias(datos)
    }
    cargarDatos()
  }, [])

  // Función para mostrar notificaciones en el modal
  const mostrarNotificacion = (type, title, message) => {
    setModalNotificacion({
      isOpen: true,
      type,
      title,
      message,
    })
  }

  // Función para cerrar el modal de notificación
  const cerrarNotificacion = () => {
    setModalNotificacion((prev) => ({ ...prev, isOpen: false }))
  }

  const agregarSugerencia = async (nueva) => {
    if (!nueva.nombre_producto?.trim() || !nueva.descripcion?.trim()) {
      // Reemplazamos alert por mostrarNotificacion
      mostrarNotificacion("error", "Campos incompletos", "Por favor completa todos los campos.")
      return
    }

    const creada = await registrarSugerencia(nueva)
    if (creada) {
      setSugerencias((prev) => [...prev, creada])
      mostrarNotificacion("success", "Sugerencia registrada", "La sugerencia fue agregada exitosamente.")
    } else {
      mostrarNotificacion("error", "Error", "No se pudo registrar la sugerencia.")
    }
  }

  const cambiarEstado = async (id_sugerencia, nuevoEstado) => {
    const actualizada = await actualizarEstadoSugerencia(id_sugerencia, nuevoEstado)
    if (actualizada) {
      setSugerencias((prev) => prev.map((s) => (s.id_sugerencia === id_sugerencia ? actualizada : s)))
      mostrarNotificacion("success", "Operación exitosa", `La sugerencia fue marcada como "${nuevoEstado}".`)
    } else {
      mostrarNotificacion("error", "Error", "No se pudo actualizar el estado.")
    }
  }

  const sugerenciasPendientes = sugerencias.filter((s) => s.estado === "pendiente")
  const sugerenciasAceptadas = sugerencias.filter((s) => s.estado === "aceptada")
  const sugerenciasRechazadas = sugerencias.filter((s) => s.estado === "rechazada")

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
          sugerencias={modalTipo === "aceptada" ? sugerenciasAceptadas : sugerenciasRechazadas}
          onCerrar={() => setModalTipo(null)}
          onMover={(id) => cambiarEstado(id, modalTipo === "aceptada" ? "rechazada" : "aceptada")}
        />
      )}

      {/* Modal de notificación */}
      <Modal
        isOpen={modalNotificacion.isOpen}
        onClose={cerrarNotificacion}
        type={modalNotificacion.type}
        title={modalNotificacion.title}
        message={modalNotificacion.message}
      />
    </div>
  )
}

export default Sugerencias
