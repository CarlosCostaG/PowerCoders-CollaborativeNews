import { toast } from "sonner";
import httpService from "../services/httpService";
import useAuth from "./useAuth";

function useServer() {
  const { token, setUser } = useAuth();

  const handleResponse = ({ data, loading, error }) => {
    if (data.data?.id) {
      setUser({ user: data.data });
    }

    if (data.data?.token) {
      setUser({ token: data.data.token });
    }

    if (error && error.message === "Wrong email or password") {
      toast.error("El usuario o contraseña es incorrecto");
    } else {
      if (error) {
        toast.error(error.message);
      }
    }

    return { data, loading, error };
  };

  return {
    get: ({ url }) =>
      httpService({ url, method: "GET", token }).then(handleResponse),
    post: ({ url, body, hasImage }) => httpService({ url, method: "POST", token, body, hasImage }).then(handleResponse),
    put: ({ url, body }) =>
      httpService({ url, method: "PUT", token, body }).then(handleResponse),
    delete: ({ url }) =>
      httpService({ url, method: "DELETE", token }).then(handleResponse),
  };
}

export default useServer;
