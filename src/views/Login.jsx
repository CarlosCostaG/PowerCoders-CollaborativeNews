import { useNavigate, Link } from "react-router-dom";
import useServer from "../hooks/useServer.js";
import useAuth from "../hooks/useAuth.js";
import { useEffect } from "react";

import styles from "../styles/Login.module.css";

function Login() {
  const { post, get } = useServer(); // obtiene la función 'post' y 'get' del hook personalizado 'useServer'
  const { token } = useAuth() // obtiene el token de autenticación del hook personalizado 'useAuth'
  const navigate = useNavigate(); // obtiene la función 'navigate' del hook 'useNavigate'

  const handleSubmit = async (e) => { // función que se ejecuta cuando se envía el formulario
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(e.target)); // obtiene los valores del formulario y los convierte en un objeto
    await post({ url: "/login", body: credentials }); // hace una petición POST a la URL '/login' con las credenciales como cuerpo
  };
  
  useEffect(() => {
    if (!token) return; // si no hay token, sale de la función

    const usr = get({ url: "/profile" }); // hace una petición GET a la URL '/profile'
    if (usr) return navigate("/"); // si la petición es exitosa, redirige a la página de inicio

  }, [token])

  return (
    <>
    <form onSubmit={handleSubmit}>
      
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="john@doe.com"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            placeholder="123456"
          />
        </div>
      </div>

      <div>
        <button type="submit"> Iniciar Sesión </button>
      </div>
    </form>

    <div>
      <p>¿Aun no tienes cuenta?</p>
      <Link to='/register'>Registrate</Link> {/* enlace que redirige a la página de registro */}
    </div>
    </>
  );
}

export default Login;
