const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_PREFERENCIA = `${API_URL}/preferenciaNotificacion`;

export async function obtenerPreferencia(id_usuario, id_tipo_notificacion) {
    console.log(id_usuario );
    console.log(id_tipo_notificacion );
  const response = await fetch(API_PREFERENCIA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_usuario, id_tipo_notificacion }),
  });

  if (!response.ok) {
    throw new Error('Error al obtener preferencia');
  }

  return response.json(); 
}