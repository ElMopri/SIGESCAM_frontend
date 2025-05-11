
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/sugerencias`;

export const obtenerSugerencias = async () => {
  try {
    console.log(API_URL);
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener sugerencias");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};


export const registrarSugerencia = async ({ nombre_producto, descripcion }) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_producto, descripcion }),
    });

    if (!res.ok) {
      const errorText = await res.text(); 
      console.error("Respuesta con error:", res.status, errorText);
      throw new Error("Error al registrar sugerencia");
    }

    const data = await res.json();
    console.log("Sugerencia creada:", data);
    return data;

  } catch (error) {
    console.error("Error al registrar sugerencia:", error);
    return null;
  }
};

//Cambiar estado
export const actualizarEstadoSugerencia = async (id, estado) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error al cambiar estado:", res.status, errorText);
      throw new Error("No se pudo cambiar el estado");
    }

    return await res.json();
  } catch (error) {
    console.error("Error al cambiar estado de sugerencia:", error);
    return null;
  }
};