import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_DEUDOR = `${API_URL}/api/deudores`; 

export const obtenerDeudorPorDNI = async (dni) => {
    try {
        const response = await axios.get(`${API_DEUDOR}/${dni}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw new Error(error.response?.data?.mensaje || "Error al obtener deudor");
    }
};

export const buscarDeudoresPorNombreODNI = async (termino) => {
    try {
        const response = await axios.get(`${API_DEUDOR}/buscar`, {
            params: { termino }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || "Error al buscar deudores");
    }
};

export const listarDeudores = async () => {
    try {
        const response = await axios.get(`${API_DEUDOR}`);
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener deudores");
    }
};
