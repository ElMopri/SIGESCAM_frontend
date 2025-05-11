import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import EstructuraLogin from "../../components/EstructuraLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
>>>>>>> refs/remotes/origin/main
import "./Login.css";
import EstructuraLogin from "../../components/EstructuraLogin";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dni === "123" && password === "admin") {
      navigate("/admin");
    } else if (dni === "456" && password === "gestor") {
      navigate("/gestorDeVentas");
    } else {
      setError("Credenciales incorrectas");
    }
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

          <a href="/RestablecerContraseña" className="forgot-link">
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
