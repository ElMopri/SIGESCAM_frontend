import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EstructuraLogin from "../../components/EstructuraLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login as apiLogin } from "../../api/LoginApi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await apiLogin({ dni, contrasena: password });
      login(response.usuario, response.usuario.rol);

      switch (response.usuario.rol) {
        case "Administrador":
          navigate("/admin");
          break;
        case "Gestor de ventas":
          navigate("/gestorDeVentas");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError(err.message || "Credenciales incorrectas");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  return (
    <EstructuraLogin>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dni">Documento:</label>
          <input
            id="dni"
            type="text"
            placeholder="CC"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <div className="input-password-container">
            <input
              id="password"
              type={mostrarContrasena ? "text" : "password"}
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon-login" onClick={toggleMostrarContrasena}>
              {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <a href="/restablecerContraseña" className="forgot-link">
            ¿Olvidó su contraseña?
          </a>
        </div>

        <div className="form-group">
          <button type="submit">Ingresar</button>
        </div>

        {error && <p className="login-error">{error}</p>}
      </form>
    </EstructuraLogin>
  );
};

export default Login;
