import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_CONTRASENA = `${API_URL}/recuperar-contrasena`;

export const verificarDniUsuario = async (dni) => {
  try {
    const res = await axios.post(`${API_CONTRASENA}/verificar`, { dni });
    return res.data;
  } catch (e) {
    const mensaje =
      e.response?.data?.error ||
      e.response?.data?.message ||
      "Error al obtener el usuario";
    throw new Error(mensaje);
  }
};

export const enviarCodigoSMSRecuperacion = async (dni) => {
  try {
    const res = await axios.post(`${API_CONTRASENA}/enviar-sms`, { dni });
    return res.data;
  } catch (e) {
    const mensaje =
      e.response?.data?.error ||
      e.response?.data?.message ||
      "Error al enviar el código SMS";
    throw new Error(mensaje);
  }
};

export const enviarCodigoAEmail = async (dni) => {
  try {
    const res = await axios.post(`${API_CONTRASENA}/enviar-email`, { dni });
    return res.data;
  } catch (e) {
    const mensaje =
      e.response?.data?.error ||
      e.response?.data?.message ||
      "Error al enviar el código por correo";
    throw new Error(mensaje);
  }
};

export const comprobarCodigo = async (dni, codigo) => {
  try {
    const res = await axios.post(`${API_CONTRASENA}/validar`, {
      dni,
      codigo,
    });
    return res.data;
  } catch (e) {
    const mensaje =
      e.response?.data?.error ||
      e.response?.data?.message ||
      "Código incorrecto";
    throw new Error(mensaje);
  }
};

export const restablecerContrasena = async (
  dni,
  nuevaContrasena,
  confirmarContrasena
) => {
  try {
    const res = await axios.post(`${API_CONTRASENA}/actualizar`, {
      dni,
      nuevaContrasena,
      confirmarContrasena,
    });
    return res.data;
  } catch (e) {
    const mensaje =
      e.response?.data?.error ||
      e.response?.data?.message ||
      "Error al restablecer la contraseña";
    throw new Error(mensaje);
  }
};
