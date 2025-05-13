import React, { useState } from "react";
import "./ModalAgregarProducto.css";
import { FaTimes } from "react-icons/fa";

const ModalEditarProducto = ({ producto, categorias, onClose, onGuardar }) => {
  const [formData, setFormData] = useState({
    nombre: producto.nombre,
    precioVenta: producto.precioVenta,
    categoria: producto.categoria,
  });

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
        const productoActualizado = await actualizarProducto(
          producto.id,
          formData.nombre,
          parseFloat(formData.precioVenta),
          formData.categoria
        );
        onGuardar(productoActualizado);
        onClose();
      } catch (error) {
        alert(error.message);
      }
    }
  };

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
