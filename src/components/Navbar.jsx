import { NavLink } from "react-router-dom";

// Custom Hooks
import useAuth from "../hooks/useAuth";

// Styles
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <NavLink to="/" className={styles.mainNav__a}>
        Inicio
      </NavLink>
      {isAuthenticated && (
        <NavLink to="/send" className={styles.mainNav__a}>
          Publicar
        </NavLink>
      )}

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
