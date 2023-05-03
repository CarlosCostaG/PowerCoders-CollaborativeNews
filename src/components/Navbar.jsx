import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useServer from "../hooks/useServer";
import { apiURL } from "../config";

function NavBar() {
  const {get} = useServer()
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    const response = await get({ url: "/profile" })
    setProfile(response.data.data)
    setProfile(response);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (profile) {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand to="#logo">InsightHub</Navbar.Brand>
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
              {/* <img className='avatars' src={`${apiURL}/avatars/${profile.avatar}`}/>   */}
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

  if (profile) {
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
              <img src={`${apiURL}/avatars/${profile.avatar}`} style={{width: "8%"}}/>  
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



} 
export default NavBar;