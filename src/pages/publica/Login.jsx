import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EstructuraLogin from "../../components/EstructuraLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../api/LoginApi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const navigate = useNavigate();
  const { setUser, setRole } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const realizarLogin = async () => {
      try {
        const data = await login({ dni, contrasena: password });
        setUser(data.usuario);
        setRole(data.usuario.rol);

        if (data.usuario.rol === "Administrador") {
          navigate("/admin");
        } else if (data.usuario.rol === "Gestor de ventas") {
          navigate("/gestorDeVentas");
        } else {
          navigate("/usuario");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    realizarLogin();
  };

  const toggleMostrarContrasena = () =>
    setMostrarContrasena(!mostrarContrasena);

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
