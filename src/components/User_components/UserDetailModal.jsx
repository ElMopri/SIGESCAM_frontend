
import "./UserDetailModal.css";

const UserDetailModal = ({ user,onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles del Usuario</h2>
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
        <p><strong>Estado:</strong> {user.estado}</p>

        <button onClick={onClose} className="modal-close-button">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default UserDetailModal;
