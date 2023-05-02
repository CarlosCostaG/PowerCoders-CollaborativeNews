import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";


const ProfilePage = () => {
  const [user, setUser] = useAuth({});
  

  useAuth(() => {
    // Obtener el token de autenticación de las cookies

    fetch("/profile", {
      headers: {
        Authenticated: `Bearer ${token.split("=")[1]}`, // Enviar el token en el encabezado de autorización
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data); // Almacenar la información del usuario en el estado del componente
      })
      .catch((err) => {
        console.error(err);
        history.push("/login"); // Redirigir al usuario a la página de inicio de sesión en caso de error
      });
  }, []);

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {user.name}</p>
      <p>Correo electrónico: {user.email}</p>
      {/* Permitir al usuario editar su perfil */}
    </div>
  );
};

export default ProfilePage
