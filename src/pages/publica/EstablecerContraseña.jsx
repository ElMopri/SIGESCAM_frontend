import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { enviarNuevaContraseña } from "../../api/UsuarioApi";
import "./CrearContraseña.css";

const EstablecerContraseña = () => {
  const { token } = useParams();
  const navigate = useNavigate();

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

  const validarContrasena = () => {
    return Object.values(validaciones).every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!validarContrasena()) {
      setError("La contraseña no cumple con los requisitos.");
      return;
    }

    try {
      await enviarNuevaContraseña(token, nuevaContrasena);
      setMensaje("Contraseña creada correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Error al cambiar la contraseña");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Crear contraseña</h2>
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

export default EstablecerContraseña;
