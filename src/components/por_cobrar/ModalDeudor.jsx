"use client"

import { useEffect, useState } from "react"
import "./ModalDeudor.css"

const ModalDeudor = ({ cliente, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [productos, setProductos] = useState([
    {
      nombre: "Detodito Picante de 165 g",
      cantidad: 20,
      precio: 1500,
      fecha: "23/02/2025"
    },
    {
      nombre: "Detodito Natural de 165 g",
      cantidad: 20,
      precio: 1500,
      fecha: "23/02/2025"
    },
    {
      nombre: "Doritos de 150 g",
      cantidad: 20,
      precio: 1000,
      fecha: "28/02/2025"
    }
  ])

  useEffect(() => {
    // Animación de entrada
    setIsVisible(true)
  }, [])

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(monto)
  }

  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad)
    }, 0)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Espera a que termine la animación
  }

  return (
    <div className={`modal-deudor-overlay ${isVisible ? 'visible' : ''}`}>
      <div className={`modal-deudor-container ${isVisible ? 'visible' : ''}`}>
        <div className="modal-deudor-header">
          <h2>Detalles del deudor</h2>
          <button className="close-button" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="cliente-info">
          <div className="info-row">
            <span className="info-label">Nombre:</span>
            <span className="info-value">{cliente.nombre}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Documento de identidad:</span>
            <span className="info-value">{cliente.cedula}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Teléfono:</span>
            <span className="info-value">{cliente.telefono || "No registrado"}</span>
          </div>
        </div>
        
        <div className="productos-table-container">
          <table className="productos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio (U)</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{formatearMoneda(producto.precio)}</td>
                  <td>{producto.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="resumen-pago">
          <div className="total-row">
            <span className="total-label">Total:</span>
            <span className="total-value">{formatearMoneda(calcularTotal())}</span>
          </div>
          <div className="abono-row">
            <span className="abono-label">Abono:</span>
            <span className="abono-value">{formatearMoneda(cliente.deuda)}</span>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-guardar">
            Guardar Pago
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalDeudor