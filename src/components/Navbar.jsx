import { NavLink } from "react-router-dom";

// Custom Hooks
import useAuth from "../hooks/useAuth";

// Styles
import styles from "../styles/Navbar.module.css";

function Navbar() {
  // Obtener estado de autenticación y función para cerrar sesión usando nuestro custom hook
  const { isAuthenticated, logout } = useAuth();

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
      {isAuthenticated && (
        <NavLink to="/profile" className={styles.mainNav__a}>
          Perfil
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
    </nav>
  );
}

export default Navbar;
