import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="logo" to="#logo">InsightHub</Navbar.Brand>
        <Nav>
          <NavLink to="/">Inicio</NavLink>

          {isAuthenticated && (
            <NavLink to="/publish-post">Publicar</NavLink>
          )}

          {isAuthenticated && (
            <NavLink to="/profile">
              Perfil
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
