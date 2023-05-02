import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="#home"></Navbar.Brand>
          <Nav>
          {/* Enlace a la página de inicio */}
          <NavLink to="/">
            Inicio
          </NavLink>
          
          {/* Si el usuario está autenticado, mostrar enlace para publicar */}
          {isAuthenticated && (
            <NavLink to="/send">
              Publicar
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/profile">
              Perfil
            </NavLink>
          )}
    
          {/* Si el usuario está autenticado, mostrar enlace para cerrar sesión, de lo contrario mostrar enlace para iniciar sesión */}
          {isAuthenticated ? (
            <NavLink to="/login" onClick={logout}>
              Cerrar Sesión
            </NavLink>
          ) : (
            <NavLink to="/login">
              Inicio Sesión
            </NavLink>
          )
          }
          </Nav>
        </Container>
      </Navbar>
    </>
  );
} 
export default NavBar;