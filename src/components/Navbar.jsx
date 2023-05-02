import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useServer from "../hooks/useServer";
import { apiURL } from "../config";

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
  );
}

export default Navbar;
