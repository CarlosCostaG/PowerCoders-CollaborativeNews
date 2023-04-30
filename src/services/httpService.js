/* httpService */

import { apiURL } from "../config.js";

async function httpService({ url, method = "GET", token = null, body = null, hasImage = false }) {

  // Comprueba que la URL empiece con una barra
  if (!url.startsWith("/")) throw new Error("URL Must Start With a Slash (/)");

  // Crea una URL completa uniendo la URL base de la API y la URL de la solicitud
  const fullURL = new URL(apiURL + url);

  // Define la configuración inicial de la solicitud
  const config = {
    method,
    headers: {
      Accept: "application/json"
    },
  };

  // Añade el encabezado Content-Type si la solicitud no tiene imágenes
  if (!hasImage) {
    config.headers["Content-Type"] = "application/json"
  }

  // Añade el token de autenticación si está disponible
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Añade el cuerpo de la solicitud en formato JSON si no contiene imágenes
  if (body && !hasImage) {
    config.body = JSON.stringify(body);
  }

  // Añade el cuerpo de la solicitud si contiene imágenes
  if (body && hasImage) {
    config.body = body
  }

  try {
    // Envía la solicitud a la API y espera la respuesta
    const response = await fetch(fullURL.href, config);

    // Convierte la respuesta en formato JSON
    const data = await response.json();

    // Si la respuesta no es correcta, lanza un error
    // if (!response.ok) throw new Error(data.error)

    // Devuelve un objeto con los datos, el estado de carga y cualquier error
    return { data, loading: false, error: data.error || null };
  } catch (error) {
    // Devuelve un objeto con datos nulos, un estado de carga falso y cualquier error generado
    return { data: null, loading: false, error };
  }
}

export default httpService;

// El archivo httpService.js contiene una función asíncrona que hace una solicitud HTTP a la API. 