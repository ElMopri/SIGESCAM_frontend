import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_CONTRASENA = `${API_URL}/recuperar-contrasena`;

export const verificarDniUsuario = async (dni) => {
    const response = await axios.post(`${API_CONTRASENA}/verificar`, { dni });
    return response.data;
};

export const enviarCodigoSMSRecuperacion = async (dni) => {
    const response = await axios.post(`${API_CONTRASENA}/enviar-sms`, { dni });
    return response.data;
};

export const enviarCodigoAEmail = async (dni) => {
    const response = await axios.post(`${API_CONTRASENA}/enviar-email`, { dni });
    return response.data;
};

export const comprobarCodigo = async (dni, codigo) => {
    const response = await axios.post(`${API_CONTRASENA}/validar`, { dni, codigo });
    return response.data;
};

export const restablecerContrasena = async (dni, nuevaContrasena, confirmarContrasena) => {
    const response = await axios.post(`${API_CONTRASENA}/actualizar`, {
        dni,
        nuevaContrasena,
        confirmarContrasena,
    });
    return response.data;
};
