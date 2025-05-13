const API_URL = `${import.meta.env.VITE_BACKEND_URL}/notificaciones`;

//listar notificaciones para administradora
export const obtenerNotificaciones = async (dni) => {
  try {
    const res = await fetch(`${API_URL}/paraAdministradora/${dni}`);
    if (!res.ok) throw new Error("Error al obtener notificaciones");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

//para cambiar el estado a leida
export const actualizarEstadoNotificacion = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error al cambiar estado:", res.status, errorText);
      throw new Error("No se pudo cambiar el estado");
    }

    return await res.json();
  } catch (error) {
    console.error("Error al cambiar estado de notificación:", error);
    throw error; 
  }
};

//listar notificaciones para administradora
export const obtenerNotificacionesGestora = async (dni) => {
  try {
    const res = await fetch(`${API_URL}/paraGestoras/${dni}`);
    if (!res.ok) throw new Error("Error al obtener notificaciones");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};