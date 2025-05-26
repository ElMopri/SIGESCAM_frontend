import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL; // Ajusta según tu entorno
const API_VENTAS = `${API_URL}/ventas`;

// Agregar producto a la venta temporal
export const agregarProductoAVentaTemporal = async ({ nombreProducto, cantidad }) => {
    try {
        const response = await axios.post(`${API_VENTAS}/agregar-producto`, {
            nombreProducto,
            cantidad,
        });
        return response.data;
    } catch (error) {
        console.error(
            "Error al agregar producto a venta temporal:",
            error.response?.data?.message || error.message
        );
        throw new Error(error.response?.data?.message || "Error al agregar producto");
    }
};

// Registrar una venta completa
export const registrarVenta = async ({ productos, dni_usuario, deudor, es_fiado, fecha }) => {
    try {
        const response = await axios.post(`${API_VENTAS}/registrar-venta`, {
            productos,
            dni_usuario,
            deudor,
            es_fiado,
            fecha,
        });
        return response.data;
    } catch (error) {
        console.error(
            "Error al registrar venta:",
            error.response?.data?.message || error.message
        );
        throw new Error(error.response?.data?.message || "Error al registrar venta");
    }
};

// Obtener cantidad de ventas del día
export const obtenerVentasDelDia = async () => {
    try {
        const response = await axios.get(`${API_VENTAS}/ventas-del-dia`);
        return response.data.ventasHoy;
    } catch (error) {
        console.error(
            "Error al obtener ventas del día:",
            error.response?.data?.message || error.message
        );
        throw new Error(error.response?.data?.message || "Error al obtener ventas del día");
    }
};


export const obtenerProductosMasVendidos = async () => {
    try {
        const response = await axios.get(`${API_VENTAS}/top3-semana`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener ventas del día");
    }
};