import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL_LOGIN = `${API_URL}/login/inicio-sesion`;


export const login = async ({ dni, contrasena }) => {
  try {
    const response = await axios.post(API_URL_LOGIN, {
      dni,
      contrasena,
    });
    const data = response.data;

    // Guardar en localStorage
    localStorage.setItem('usuario_dni', data.usuario.dni);

    return data;
  } catch (error) {
    console.error("Error en login:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Error en el inicio de sesión");
  }
};
