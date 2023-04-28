import { useNavigate, Link } from "react-router-dom";
import useServer from "../hooks/useServer.js";
import useAuth from "../hooks/useAuth.js";
import { useEffect } from "react";

function Login() {
  const { post, get } = useServer();
  const { token } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(e.target));
    await post({ url: "/login", body: credentials });
  };
  
  useEffect(() => {
    if (!token) return;

    const usr = get({ url: "/profile" });
    if (usr) return navigate("/");

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
      <Link to='/register'>Registrate</Link>
    </div>
    </>
  );
}

export default Login;
