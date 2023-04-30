import { toast } from "sonner";
import httpService from "../services/httpService";
import useAuth from "./useAuth";

function useServer() {
  const { token, setUser } = useAuth();

  // Función que maneja la respuesta del servidor
  const handleResponse = ({ data, loading, error }) => {
    // Si hay datos del usuario en la respuesta, actualiza el usuario
    if (data.data?.id) {
      setUser({ user: data.data });
    }

    // Si hay un token en la respuesta, actualiza el token del usuario
    if (data.data?.token) {
      setUser({ token: data.data.token });
    }

    // Si hay un error y es un error de autenticación, muestra un mensaje de error
    if (error && error.message === "Wrong email or password") {
      toast.error("El usuario o contraseña es incorrecto");
    } else {
      // Si hay un error que no es de autenticación, muestra el mensaje de error
      if (error) {
        toast.error(error.message);
      }
    }

    // Retorna los datos, el estado de carga y el error para ser utilizados en el componente que utiliza esta función
    return { data, loading, error };
  };

  return {
    // Métodos para hacer peticiones HTTP al servidor, que retornan una promesa que maneja la respuesta del servidor
    get: ({ url }) => httpService({ url, method: "GET", token }).then(handleResponse),
    post: ({ url, body, hasImage }) => httpService({ url, method: "POST", token, body, hasImage }).then(handleResponse),
    patch: ({ url, body, hasImage }) => httpService({ url, method: "PATCH", token, body, hasImage }).then(handleResponse),
    delete: ({ url }) => httpService({ url, method: "DELETE", token }).then(handleResponse),
  };
}

export default useServer;
