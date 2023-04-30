import { useNavigate } from "react-router-dom";
import useServer from "../hooks/useServer.js";

function Register() {
  const { post } = useServer();  // Se utiliza el hook useServer para hacer solicitudes al servidor
  const navigate = useNavigate(); // Se utiliza el hook useNavigate para cambiar la ruta del navegador

  const handleSubmit = async (e) => { // Función que se ejecuta cuando se envía el formulario
    e.preventDefault(); // Se previene la acción por defecto de enviar el formulario

    const userRegistration = new FormData(e.target); // Se crea un nuevo objeto FormData con los datos del formulario
    const register = await post({ url: "/register", body: userRegistration, hasImage: true }); // Se hace una solicitud al servidor para registrar al usuario
    if (register) return navigate("/login"); // Si la solicitud es exitosa, se redirige al usuario a la página de inicio de sesión
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder="@me"
          />
        </div>

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

        <div>
            <label htmlFor="avatar">Avatar</label>
            <input type="file" name="avatar" id="avatar" />
        </div>
      </div>

      <div>
        <button type="submit"> Iniciar Sesión </button>
      </div>
    </form>
  );
}

export default Register;
