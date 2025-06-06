import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_DEUDOR = `${API_URL}/deudores`;


export const obtenerDeudorPorDNI = async (dni) => {
    try {
        const response = await axios.get(`${API_DEUDOR}/${dni}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) return null;
        throw new Error(error.response?.data?.mensaje || "Error al obtener deudor");
    }
};

export const obtenerDeudores = async () => {
    try {
        const response = await axios.get(API_DEUDOR);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) return null;
        throw new Error(error.response?.data?.mensaje || "Error al obtener deudores");
    }
};

export const buscarDeudores = async (termino) => {
    try {
        const respuesta = await axios.get(`${API_DEUDOR}/buscar?termino=${termino}`);
        return respuesta.data;
    } catch (error) {
        console.error("Error al buscar deudores:", error);
        return [];
    }
};

export const eliminarDeudorPorDNI = async (dni) => {
    try {
        const response = await axios.delete(`${API_DEUDOR}/${dni}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || "Error al eliminar deudor");
    }
};

export const obtenerVentasFiadasDeudor = async (dni) => {
    try {
        console.log("eenntroo");
        const response = await axios.get(`${API_DEUDOR}/ventas-fiadas/${dni}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw new Error(error.response?.data?.mensaje || "Error al obtener deudor");
    }
};

// Registrar un abono a una venta fiada
export const registrarAbono = async ({ dni_deudor, id_venta, monto_abono, fecha_abono }) => {
    try {
        const response = await axios.post(`${API_DEUDOR}/registrar-abono`, {
            dni_deudor,
            id_venta,
            monto_abono,
            fecha_abono
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || "Error al registrar el abono");
    }
};