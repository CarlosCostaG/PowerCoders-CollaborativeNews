import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useServer from "../hooks/useServer";
import { apiURL } from "../config";

<<<<<<< HEAD
// Custom Hooks
import useAuth from "../hooks/useAuth";

// Styles
import styles from "../styles/Navbar.module.css";

function Navbar() {
  // Obtener estado de autenticación y función para cerrar sesión usando nuestro custom hook
  const {get} = useServer()
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    const response = await get({ url: "/profile" })
    setProfile(response.data.data)
    console.log(response.data)
    // setProfile(response);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="navbar">
      {/* Enlace a la página de inicio */}
      <NavLink to="/" className={styles.mainNav__a}>
        Inicio
      </NavLink>
      
      {/* Si el usuario está autenticado, mostrar enlace para publicar */}
      {isAuthenticated && (
        <NavLink to="/send" className={styles.mainNav__a}>
          Publicar
        </NavLink>
      )}

      {/* Si el usuario está autenticado, mostrar enlace para cerrar sesión, de lo contrario mostrar enlace para iniciar sesión */}
      {isAuthenticated ? (
        <NavLink to="/login" className={styles.mainNav__a} onClick={logout}>
          Cerrar Sesión
        </NavLink>
      ) : (
        <NavLink to="/login" className={styles.mainNav__a}>
          Inicio Sesión
        </NavLink>
      )}

      {isAuthenticated && (
        <NavLink to="/profile" className={styles.mainNav__a}>
          <img className={styles.navAvatar} src={`${apiURL}/avatars/${profile.avatar}`}/>
          Perfil   
        </NavLink>
      )}
    </nav>
=======
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
>>>>>>> ce2aaba4753158c676c3ba03aeb133eee86f172e
  );
} 
export default NavBar;