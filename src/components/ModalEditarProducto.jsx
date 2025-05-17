import React, { useState, useEffect } from "react";
import "./ModalAgregarProducto.css";
import { FaTimes } from "react-icons/fa";

import { editarProductoPorNombre } from "../api/ProductoApi.js"; // Asegúrate de que la ruta sea correcta

const ModalEditarProducto = ({ producto, categorias, onClose, onGuardar }) => {
  if (!producto) return null;

  const [formData, setFormData] = useState({
    nombre: producto?.producto || "", // Asegúrate de que el valor inicial sea una cadena vacía si no está definido
    precioVenta: producto?.precio || "", // Asegúrate de que el valor inicial sea una cadena vacía si no está definido
    categoria: producto?.categoria || "", // Asegúrate de que el valor inicial sea una cadena vacía si no está definido
  });

  // Sincroniza el estado si el producto cambia
  useEffect(() => {

    console.log("Producto recibido:", producto);

    setFormData({
      nombre: producto?.producto || "",
      precioVenta: producto?.precio || "",
      categoria: producto?.categoria || "",
    });
  }, [producto]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      formData.nombre.trim() &&
      formData.precioVenta &&
      formData.categoria
    ) {
      try {
        const datosActualizados = {
          nuevoNombre: formData.nombre,
          precio_venta: parseFloat(formData.precioVenta),
          nombre_categoria: formData.categoria,
        };
        const productoActualizado = await editarProductoPorNombre(
          producto.producto, // Assuming 'producto.producto' contains the current name
          datosActualizados
        );
        onGuardar(productoActualizado);
        onClose();
      } catch (error) {
      console.error("Error al editar el producto:", error)
      if (onError) {
        onError(`Error al editar el producto: ${error.message || "Ocurrió un problema inesperado"}`)
      }
    }
  }
}

  return (
    <div className="modal-agregar-overlay">
      <div className="modal-agregar">
        <FaTimes className="cerrar-icono" onClick={onClose} />
        <div className="registrar-producto">
          <h2>Editar Producto</h2>
        </div>
        <label htmlFor="nombreProducto" style={{ marginBottom: "-6px" }}>
          Nuevo nombre del producto
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label style={{ marginBottom: "-6px" }}>Nuevo precio de venta</label>
        <input
          type="number"
          name="precioVenta"
          value={formData.precioVenta}
          onChange={handleChange}
        />

        <label htmlFor="categoria" style={{ marginBottom: "-6px" }}>
          Nueva categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="registrar-producto">
          <button className="btn-editar-modal" onClick={handleSubmit}>
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarProducto;