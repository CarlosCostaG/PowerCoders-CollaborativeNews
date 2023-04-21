import { toast } from "sonner"
import httpService from "../services/httpService"
import useAuth from "./useAuth"

function useServer() {
    const { token, setUser } = useAuth()

    const handleResponse = ({ data, loading, error }) => {
        if (data?.status && data?.data?.token) { 
            setUser({...data})
        }

        if (error && error.message === "Wrong email or password")  {
            toast.error('El usuario o contraseña es incorrecto')
        } else {
            if (error) {
                toast.error(error.message)
            }
        }

        return {data, loading, error}
    }

    return {
        get: ({ url }) => httpService({ url, method: 'GET', token }),
        post: ({ url, body }) => httpService({ url, method: 'POST', token, body }).then(handleResponse),
        put: ({ url, body }) => httpService({ url, method: 'PUT', token, body }).then(handleResponse),
        delete: ({ url }) => httpService({ url, method: 'DELETE', token })
    }
}

export default useServer
