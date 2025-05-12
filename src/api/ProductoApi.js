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

