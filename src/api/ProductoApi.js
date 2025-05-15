import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_PRODUCTOS = `${API_URL}/productos`;

// Obtener lista resumida de productos activos
export const obtenerProductos = async () => {
    try {
        const response = await axios.get(`${API_PRODUCTOS}/resumido/activos`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al obtener productos");
    }
};

// Buscar productos por nombre parecido
export const buscarProductosPorNombreParecido = async (nombre) => {
    try {
        const response = await axios.get(`${API_PRODUCTOS}/nombre_parecido/${nombre}`);
        return response.data;
    } catch (error) {
        console.error("Error al buscar productos por nombre:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al buscar productos por nombre");
    }
};

// Editar producto por nombre
export const editarProductoPorNombre = async (nombre, datosActualizados) => {
    try {
        const response = await axios.put(`${API_PRODUCTOS}/nombre/${nombre}`, datosActualizados);
        return response.data;
    } catch (error) {
        console.error("Error al editar producto por nombre:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al editar producto por nombre");
    }
};

// Activar y desactivar producto por nombre
export const activarDesactivarProductoPorNombre = async (nombre, activo) => {
    try {
        const response = await axios.patch(`${API_PRODUCTOS}/nombre/${nombre}`, { activo });
        return response.data;
    } catch (error) {
        console.error("Error al activar/desactivar producto por nombre:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al activar/desactivar producto por nombre");
    }
};

// Filtrar productos por cantidad, categoria y precio
export const filtrarProductos = async (cantidad, nombre_categoria, precio) => {
    try {
        const response = await axios.get(`${API_PRODUCTOS}/cantidad_categoria_precio`, {
            params: { cantidad, nombre_categoria, precio }
        });
        return response.data;
    } catch (error) {
        console.error("Error al filtrar productos:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al filtrar productos");
    }
};