import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  verificarDniUsuario,
  enviarCodigoSMSRecuperacion,
  enviarCodigoAEmail,
  comprobarCodigo,
} from "../../api/RecuperarContrasenaApi.js";
import EstructuraLogin from "../../components/EstructuraLogin";
import CountdownTimer from "../../components/CountdownTimer";
import "./RestablecerContraseña.css";

const RestablecerContraseña = () => {
  const [documento, setDocumento] = useState("");
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [codigoToken, setCodigoToken] = useState("");
  const [mensajeValidacion, setMensajeValidacion] = useState("");
  const [mensajeColor, setMensajeColor] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const TIEMPO_EXPIRACION_MS = 5 * 60 * 1000; // 5 minutos

  useEffect(() => {
    const savedDocumento = localStorage.getItem("recuperacion_documento");
    const savedOpcion = localStorage.getItem("recuperacion_opcion");
    const timestamp = localStorage.getItem("recuperacion_token_timestamp");
    const ahora = Date.now();

    if (timestamp) {
      const tiempoExpiracion = parseInt(timestamp, 10);
      if (ahora >= tiempoExpiracion) {
        // Si ya expiró, limpiar todo
        limpiarLocalStorage();
        setOpcionSeleccionada("");
      } else {
        // Si aún no expira, restaurar todo
        if (savedDocumento) setDocumento(savedDocumento);
        if (savedOpcion) setOpcionSeleccionada(savedOpcion);
        setExpiryTime(tiempoExpiracion);
      }
    }
  }, []);

  const limpiarLocalStorage = () => {
    localStorage.removeItem("recuperacion_documento");
    localStorage.removeItem("recuperacion_opcion");
    localStorage.removeItem("recuperacion_token_timestamp");
  };

  const handleEnvioToken = async (opcion) => {
    if (!documento) {
      setError("Por favor, ingresa un número de documento.");
      setMensajeColor("red");
      setTimeout(() => {
        setError("");
      }, 1800);
      return;
    }

    try {
      await verificarDniUsuario(documento);
      let respuesta;

      if (opcion === "correo") {
        respuesta = await enviarCodigoAEmail(documento);
      } else if (opcion === "sms") {
        respuesta = await enviarCodigoSMSRecuperacion(documento);
      }

      setError(respuesta?.message || "Código enviado correctamente");
      setMensajeColor("green");
      setOpcionSeleccionada(opcion);
      
      const newExpiryTime = Date.now() + TIEMPO_EXPIRACION_MS;
      setExpiryTime(newExpiryTime);
      localStorage.setItem("recuperacion_documento", documento);
      localStorage.setItem("recuperacion_opcion", opcion);
      localStorage.setItem("recuperacion_token_timestamp", newExpiryTime.toString());

      setTimeout(() => {
        setError("");
      }, 1800);
    } catch (err) {
      setError(err.message || "Hubo un error en el proceso");
      setMensajeColor("red");
      setTimeout(() => {
        setError("");
      }, 1800);
    }
  };

  const handleTokenExpired = () => {
    setMensajeValidacion("El código ha expirado. Por favor, solicite uno nuevo.");
    setMensajeColor("red");
    setCodigoToken("");
    limpiarLocalStorage();
    setOpcionSeleccionada("");
    setTimeout(() => {
      setMostrarModal(false);
      setMensajeValidacion("");
    }, 3000);
  };

  const mostrarModalToken = () => {
    setMostrarModal(true);
  };

  const validarToken = async () => {
    if (codigoToken.length !== 6) {
      setMensajeValidacion("El token debe tener 6 dígitos");
      setMensajeColor("red");
      inputRef.current?.focus();

      setTimeout(() => {
        setMensajeValidacion("");
      }, 1200);
      return;
    }

    try {
      await comprobarCodigo(documento, codigoToken);
      setMensajeValidacion("Token validado correctamente");
      setMensajeColor("green");
      limpiarLocalStorage();
      setCodigoToken("");
      navigate("/crearContraseña", { state: { dni: documento } });
    } catch (err) {
      setMensajeValidacion(
        err?.response?.data?.message || "Token incorrecto, intente nuevamente"
      );
      setMensajeColor("red");
      setCodigoToken("");
      setTimeout(() => {
        setMensajeValidacion("");
      }, 1200);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (mostrarModal && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [mostrarModal]);

  return (
    <EstructuraLogin>
      <h2>Restablecer contraseña</h2>
      <p>
        Ingresa tu número de documento y elige si deseas recibir el token de
        verificación por correo electrónico o mensaje de texto (SMS).
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
          {error && <p className={`error-message ${mensajeColor}`}>{error}</p>}
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
            {expiryTime && (
              <CountdownTimer
                expiryTime={expiryTime}
                onExpire={handleTokenExpired}
              />
            )}
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
          <div className="button-group-restablecer">
            <button
              type="button"
              className="cancelar-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-token">
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

            <div
              className="otp-container"
              onClick={() => inputRef.current?.focus()}
            >
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
