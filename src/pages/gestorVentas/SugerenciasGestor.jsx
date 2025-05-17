"use client"

import { useState, useEffect } from "react"
import "./SugerenciasGestor.css"
import TablaSugerenciasGestor from "../../components/TablaSugerenciasGestor";
import InputSugerencia from "../../components/InputSugerencia"


import { obtenerSugerencias, registrarSugerencia } from "../../api/SugerenciasApi.js"

const SugerenciasGestor = () => {
  const [sugerencias, setSugerencias] = useState([])
  const [filtro, setFiltro] = useState("todas")

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerSugerencias()
      if (datos) setSugerencias(datos)
    }
    cargarDatos()
  }, [])

  const agregarSugerencia = async (nueva) => {
    if (!nueva.nombre_producto?.trim() || !nueva.descripcion?.trim()) {
      alert("Por favor completa todos los campos.")
      return
    }

    const creada = await registrarSugerencia(nueva)
    if (creada) {
      setSugerencias((prev) => [...prev, creada])
    } else {
      alert("No se pudo registrar la sugerencia")
    }
  }

  const filtrarSugerencias = () => {
    if (filtro === "todas") return sugerencias
    return sugerencias.filter((s) => s.estado === filtro)
  }

  return (
    <div className="sugerencias-admin">
      <InputSugerencia onAgregar={agregarSugerencia} />

      <div className="filtro-sugerencias">
        <label>Filtrar por estado:</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="select-filtro">
          <option value="todas">Todas</option>
          <option value="pendiente">Pendientes</option>
          <option value="aceptada">Aceptadas</option>
          <option value="rechazada">Rechazadas</option>
        </select>
      </div>

      <div className="label-sugerencia">
        <label>Lista de Sugerencias</label>
      </div>

      <TablaSugerenciasGestor sugerencias={filtrarSugerencias()} />
    </div>
  )
}

export default SugerenciasGestor
