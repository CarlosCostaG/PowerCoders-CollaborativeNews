import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import useServer from "../hooks/useServer";
import { apiURL } from "../config";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const { get } = useServer();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const response = await get({ url: "/profile" });
    setProfile(response.data.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="#logo">InsightHub</Navbar.Brand>
        <Nav>
          <NavLink to="/">Inicio</NavLink>

          {isAuthenticated && (
            <NavLink to="/send">Publicar</NavLink>
          )}

          {isAuthenticated && profile && (
            <NavLink to="/profile">
              Perfil
              <img
                src={`${apiURL}/avatars/${profile.avatar}`}
                style={{ width: "8%" }}
                alt="avatar"
              />
            </NavLink>
          )}

          {isAuthenticated ? (
            <NavLink to="/login" onClick={logout}>
              Cerrar Sesión
            </NavLink>
          ) : (
            <NavLink to="/login">Inicio Sesión</NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
