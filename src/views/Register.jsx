import { useNavigate } from "react-router-dom";
import useServer from "../hooks/useServer.js";

function Register() {
  const { post } = useServer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRegistration = new FormData(e.target);
    const register = await post({ url: "/register", body: userRegistration, hasImage: true });
    if (register) return navigate("/login");
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
