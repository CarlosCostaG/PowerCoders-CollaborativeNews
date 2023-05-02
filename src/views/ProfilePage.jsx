import React, { useState, useEffect } from "react";


const Profile = () => {
  const [user, setUser] = useState({});
  

  useEffect(() => {
    // Obtener el token de autenticación de las cookies
    const token = document.cookie.split(";").find((cookie) => cookie.startsWith("token="));

    fetch("/profile", {
      headers: {
        Authorization: `Bearer ${token.split("=")[1]}`, // Enviar el token en el encabezado de autorización
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

export default Profile;
