import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_USUARIOS = `${API_URL}/usuarios`;

// Obtener usuario por DNI- este sirve pa que cuando edite el email, lo cargue primero, pa q se muestre el que tiene
export const obtenerPorId = async (dni) => {
  try {
    const response = await axios.get(`${API_USUARIOS}/${dni}`);
    // Asegurarnos de que el usuario tenga el campo url_imagen
    const usuario = {
      ...response.data,
      url_imagen: response.data.url_imagen || null
    };
    return usuario;
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

export const validarCorreoExistente = async (email, dniActual) => {
  try {
    const response = await axios.post(`${API_USUARIOS}/validar-email`, {
      email,
      dniActual
    });
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al validar el correo';
    console.error('Error al validar correo:', mensaje);
    throw new Error(mensaje);
  }
};

export const listarUsuarios = async () => {
  try {
    const response = await axios.get(API_USUARIOS);
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al listar usuarios';
    console.error('Error al listar usuarios:', mensaje);
    throw new Error(mensaje);
  }
};

export const registrar = async (usuario) => {
  try {
    const response = await axios.post(`${API_USUARIOS}`, usuario);
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al registrar el usuario';
    console.error('Error al registrar usuario:', mensaje);
    throw new Error(mensaje);
  }
};

export const actualizarUsuario = async (dni, usuarioData) => {
  try {
    const response = await axios.put(`${API_USUARIOS}/${dni}`, usuarioData);
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al actualizar el usuario';
    console.error('Error al actualizar usuario:', mensaje);
    throw new Error(mensaje);
  }
};


export const cambiarEstadoUsuario = async (dni, estado) => {
  try {
    const response = await axios.patch(`${API_USUARIOS}/${dni}`, { estado });
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al cambiar estado del usuario';
    console.error('Error al cambiar estado:', mensaje);
    throw new Error(mensaje);
  }
};


export const enviarNuevaContraseña = async (token, contrasena) => {
  try {
    const response = await fetch(`${API_USUARIOS}/crear-contrasena/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contrasena }), // ahora coincide con el backend
    });

    const data = await response.json();
    console.log("Respuesta cruda del backend:", data);

    if (!response.ok) {
      throw new Error(data.message || "Error al crear la contraseña");
    }

    return data;
  } catch (error) {
    console.error("Error en enviar Nueva Contraseña:", error);
    alert(error.message || "Error inesperado al enviar la nueva contraseña");
  }
};

// Subir foto de perfil a Cloudinary (a través del backend)
export const subirFotoPerfil = async (dni, archivoImagen) => {
  const formData = new FormData();
  formData.append('imagen', archivoImagen);
  try {
    const response = await axios.post(`${API_USUARIOS}/${dni}/foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Verificar que la respuesta tenga la estructura esperada
    if (!response.data || !response.data.url_imagen) {
      throw new Error('La respuesta del servidor no incluye la URL de la imagen');
    }
    
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al subir la foto de perfil';
    throw new Error(mensaje);
  }
};