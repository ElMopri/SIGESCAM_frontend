import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_CATEGORIAS = `${API_URL}/categorias`;

// Obtener todas las categorías
export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(API_CATEGORIAS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Error al obtener categorías");
  }
};

// Crear una nueva categoría
export const crearCategoria = async (nombre, descripcion) => {
  try {
    const response = await axios.post(API_CATEGORIAS, { nombre, descripcion });
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Error al crear categoría");
  }
};

// Actualizar una categoría
export const actualizarCategoria = async (nombreOriginal, nuevoNombre, nuevaDescripcion) => {
  try {
    const response = await axios.put(API_CATEGORIAS, {
      nombreOriginal,
      nuevoNombre,
      nuevaDescripcion,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar categoría:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Error al actualizar categoría");
  }
};

// Eliminar una categoría
export const eliminarCategoria = async (nombre) => {
  try {
    const response = await axios.delete(`${API_CATEGORIAS}/${encodeURIComponent(nombre)}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar categoría:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Error al eliminar categoría");
  }
};
