import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_USUARIOS = `${API_URL}/usuarios`;

// Obtener usuario por DNI- este sirve pa que cuando edite el email, lo cargue primero, pa q se muestre el que tiene
export const obtenerPorId = async (dni) => {
  try {
    const response = await axios.get(`${API_USUARIOS}/${dni}`);
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al obtener el usuario';
    console.error('Error al obtener usuario:', mensaje);
    throw new Error(mensaje);
  }
};

export const editarCorreo = async (dni, nuevoEmail) => {
  try {
    const response = await axios.put(`${API_USUARIOS}/email/${dni}`, {
      nuevoEmail,
    });
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al actualizar el correo';
    console.error('Error al actualizar correo:', mensaje);
    throw new Error(mensaje);
  }
};
