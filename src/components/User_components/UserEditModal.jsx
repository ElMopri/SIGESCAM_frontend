import React, { useState, useEffect } from "react";
import { obtenerPorId, actualizarUsuario } from "../../api/UsuarioApi";
import "./UserEditModal.css";

const UserEditModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    email: "",
    telefono: "",
    rol: ""
  });

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const userData = await obtenerPorId(user.dni);
        setFormData({
          dni: userData.dni,
          nombre: userData.nombre,
          email: userData.email,
          telefono: userData.telefono,
          rol: userData.rol_id
        });
      } catch (err) {
        setError("Error al cargar datos del usuario");
      } finally {
        setLoadingData(false);
      }
    };

    cargarDatosUsuario();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      await actualizarUsuario(formData.dni, {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        id_rol: formData.rol
      });
      onUpdate(); // Notificar al componente padre
      onClose(); // Cerrar el modal
    } catch (err) {
      setError(err.message || "Error al actualizar usuario");
    } finally {
      setCargando(false);
    }
  };

  if (loadingData) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Cargando datos del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Usuario</h2>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>DNI:</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              readOnly
              disabled
            />
          </div>

          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Rol:</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Gestor de Ventas">Gestor de ventas</option>
            </select>
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-buttons">
            <button type="submit" disabled={cargando}>
              {cargando ? "Guardando..." : "Guardar cambios"}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-cancel"
              disabled={cargando}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;