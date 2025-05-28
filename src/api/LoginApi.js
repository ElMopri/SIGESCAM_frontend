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
    console.log('Respuesta del login:', data); // Para ver qué devuelve el backend

    // Asegurarnos de que el usuario tenga todos los campos necesarios
    const usuario = {
      ...data.usuario,
      url_imagen: data.usuario.url_imagen || null // Asegurarnos de que el campo exista
    };

    // Guardar en localStorage
    localStorage.setItem('usuario_dni', usuario.dni);
    localStorage.setItem('user', JSON.stringify(usuario)); // También guardamos el usuario completo aquí

    return {
      ...data,
      usuario // Devolver el usuario con el campo url_imagen garantizado
    };
  } catch (error) {
    console.error("Error en login:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Error en el inicio de sesión");
  }
};
