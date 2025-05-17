import React, { useState, useEffect } from "react";
import { obtenerPorId, actualizarUsuario, validarCorreoExistente } from "../../api/UsuarioApi";
import "./UserEditModal.css";

const UserEditModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    email: "",
    telefono: "",
    rol: ""
  });

  const [originalEmail, setOriginalEmail] = useState("");
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
        setOriginalEmail(userData.email);
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
    setError(null);
  };

  const validateForm = async () => {
    if (!formData.rol) {
      setError("Por favor, seleccione un rol para el usuario");
      return false;
    }
    if (!formData.email) {
      setError("El correo electrónico es requerido");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, ingrese un correo electrónico válido");
      return false;
    }

    // Solo validamos si el correo existe si es diferente al original
    if (formData.email !== originalEmail) {
      try {
        await validarCorreoExistente(formData.email, formData.dni);
      } catch (err) {
        setError("El correo electrónico ingresado ya está en uso");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const isValid = await validateForm();
      if (!isValid) {
        setCargando(false);
        return;
      }

      await actualizarUsuario(formData.dni, {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        id_rol: formData.rol
      });
      onUpdate();
      onClose();
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
              className={error?.toLowerCase().includes('correo') ? 'error' : ''}
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