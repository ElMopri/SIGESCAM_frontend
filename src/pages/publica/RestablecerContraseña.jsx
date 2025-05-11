import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EstructuraLogin from "../../components/EstructuraLogin";
import "./RestablecerContraseña.css";

const RestablecerContraseña = () => {
  const [documento, setDocumento] = useState("");
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [codigoToken, setCodigoToken] = useState("");
  const [mensajeValidacion, setMensajeValidacion] = useState("");
  const [mensajeColor, setMensajeColor] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleEnvioToken = (opcion) => {
    if (!documento) {
      setError("Por favor, ingrese un documento válido.");
      return;
    }
    setError("");
    setOpcionSeleccionada(opcion);
  };

  const mostrarModalToken = () => {
    setMostrarModal(true);
  };

  const validarToken = () => {
    if (codigoToken.length !== 6) {
      setMensajeValidacion("El token debe tener 6 dígitos");
      setMensajeColor("red");
      inputRef.current?.focus();
      return;
    }

    const tokenValido = codigoToken === "123456"; // Ejemplo

    if (tokenValido) {
      setMensajeValidacion("Token validado correctamente");
      setMensajeColor("green");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setMensajeValidacion("Token incorrecto, intente nuevamente");
      setMensajeColor("red");
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (mensajeColor === "red" && mensajeValidacion && codigoToken.length > 0) {
      const timer = setTimeout(() => {
        setMensajeValidacion("");
        setMensajeColor("");
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [codigoToken, mensajeColor, mensajeValidacion]);

  useEffect(() => {
    if (mostrarModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mostrarModal]);

  return (
    <EstructuraLogin>
      <h2>Restablecer contraseña</h2>
      <p>
       Ingresa tu número de documento y elige si deseas recibir el token de verificación por correo electrónico o mensaje de texto (SMS).
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group-restablecer">
          <label>Documento:</label>
          <div className="input-with-icon">
            <i className="fas fa-id-card"></i>
            <input
              type="text"
              placeholder="CC"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        {!opcionSeleccionada ? (
          <div className="envio-token-buttons">
            <button
              type="button"
              className="envio-btn correo"
              onClick={() => handleEnvioToken("correo")}
            >
              <i className="fas fa-envelope"></i>
              Por correo
            </button>
            <button
              type="button"
              className="envio-btn sms"
              onClick={() => handleEnvioToken("sms")}
            >
              <i className="fas fa-mobile-alt"></i>
              Por SMS
            </button>
          </div>
        ) : (
          <div className="button-group-restablecer">
            <button
              type="button"
              className="restablecer-btn"
              onClick={mostrarModalToken}
            >
              Ingresar token recibido por{" "}
              {opcionSeleccionada === "correo" ? "correo" : "SMS"}
            </button>
          </div>
        )}

        <div className="button-group-restablecer">
          <button
            type="button"
            className="cancelar-btn"
            onClick={() => navigate("/login")}
          >
            Cancelar
          </button>
        </div>
      </form>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span
              className="close"
              onClick={() => {
                setMostrarModal(false);
                setCodigoToken("");
                setMensajeValidacion("");
                setMensajeColor("");
              }}
            >
              &times;
            </span>
            <h3>Clave de token</h3>
            <p>Ingrese el token de 6 dígitos que recibió</p>

            <div className="otp-container">
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={codigoToken}
                onChange={(e) =>
                  setCodigoToken(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="otp-hidden-input"
                autoComplete="one-time-code"
              />
              {Array(6)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className={`otp-circle ${codigoToken[i] ? "filled" : ""}`}
                    onClick={() => inputRef.current?.focus()}
                  />
                ))}
            </div>

            <button className="validar-btn" onClick={validarToken}>
              Validar
            </button>
            {mensajeValidacion && (
              <p className={`mensaje-validacion ${mensajeColor}`}>
                {mensajeValidacion}
              </p>
            )}
          </div>
        </div>
      )}
    </EstructuraLogin>
  );
};

export default RestablecerContraseña;
