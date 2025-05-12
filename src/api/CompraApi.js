

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_COMPRAS = `${API_URL}/compras`;

// Obtener historial completo de compras sin filtros
export const obtenerHistorialCompras = async () => {
    try {
        const response = await axios.get(`${API_COMPRAS}/historial`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener historial:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al obtener historial de compras");
    }
};

// Filtrar las compras por fechas
export const filtrarComprasPorFecha = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(`${API_COMPRAS}/historial/fecha`, {
            params: {
                fechaInicio,
                fechaFin
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al filtrar por fecha:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al filtrar por fecha");
    }
};

// Filtrar compras por nombre de producto
export const filtrarComprasPorProducto = async (nombre) => {
    try {
        const response = await axios.get(`${API_COMPRAS}/historial/producto`, {
            params: { nombre }
        });
        return response.data;
    } catch (error) {
        console.error("Error al filtrar por producto:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al filtrar por producto");
    }
};
