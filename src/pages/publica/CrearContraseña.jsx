import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./CrearContraseña.css";
import { restablecerContrasena } from "../../api/RecuperarContrasenaApi";

const CrearContraseña = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dni } = location.state || {};

  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [verConfirmacion, setVerConfirmacion] = useState(false);

  const validaciones = {
    longitud: nuevaContrasena.length >= 8,
    mayuscula: /[A-Z]/.test(nuevaContrasena),
    minuscula: /[a-z]/.test(nuevaContrasena),
    numero: /[0-9]/.test(nuevaContrasena),
    simbolo: /[\W_]/.test(nuevaContrasena),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dni) {
      setError(
        "No se encontró el documento del usuario. Por favor, complete el proceso desde el inicio."
      );
      setTimeout(() => navigate("/recuperar-contrasena"), 3000);
      return;
    }

    setMensaje("");
    setError("");

    try {
      const respuesta = await restablecerContrasena(
        dni,
        nuevaContrasena,
        confirmarContrasena
      );
      setMensaje(respuesta.mensaje);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Error al cambiar la contraseña");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Restablecer contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label>Nueva contraseña</label>
          <div className="input-password-container">
            <input
              type={verPassword ? "text" : "password"}
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
            />
            <span
              onClick={() => setVerPassword(!verPassword)}
              className="eye-icon"
            >
              {verPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label>Confirmar contraseña</label>
          <div className="input-password-container">
            <input
              type={verConfirmacion ? "text" : "password"}
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
            />
            <span
              onClick={() => setVerConfirmacion(!verConfirmacion)}
              className="eye-icon"
            >
              {verConfirmacion ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Guardar contraseña</button>

          <div className="checklist">
            <p>La contraseña debe contener:</p>
            <ul>
              <li className={validaciones.longitud ? "valid" : ""}>
                Al menos 8 caracteres
              </li>
              <li className={validaciones.mayuscula ? "valid" : ""}>
                Una letra mayúscula
              </li>
              <li className={validaciones.minuscula ? "valid" : ""}>
                Una letra minúscula
              </li>
              <li className={validaciones.numero ? "valid" : ""}>Un número</li>
              <li className={validaciones.simbolo ? "valid" : ""}>
                Un símbolo o carácter especial
              </li>
            </ul>
          </div>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default CrearContraseña;
