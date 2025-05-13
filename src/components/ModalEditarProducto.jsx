import React, { useState } from "react";
import "./ModalAgregarProducto.css";
import { FaTimes } from "react-icons/fa";

const ModalEditarProducto = ({ producto, categorias, onClose, onGuardar }) => {
  const [formData, setFormData] = useState({
  producto: producto.producto,
  precio: producto.precio,
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
        <label htmlFor="nombreProducto" style={{marginBottom: "-6px"}}>Nuevo nombre del producto</label>
        <input
          type="text"
          name="producto"
          value={formData.producto}
          onChange={handleChange}
        />

        <label style={{marginBottom: "-6px"}}>Nuevo precio de venta</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />

        <label style={{marginBottom: "-6px"}}>Nueva categoría</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((cat) => (
            <option key={cat.nombre} value={cat.nombre}>
              {cat.nombre}
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
