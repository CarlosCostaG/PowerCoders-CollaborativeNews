import { useMemo, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import isEmpty from "../helpers/isEmpty";

const AuthProvider = ({ children }) => {
  // Obtenemos el usuario actual del almacenamiento local o lo inicializamos vacío.
  const localUser = JSON.parse(localStorage.getItem("user")) || {};
  // Usamos un estado para guardar el usuario actual.
  const [currentUser, setCurrentUser] = useState(localUser);

  // Función que actualiza el usuario actual con la data proporcionada y lo guarda en el almacenamiento local.
  const setUserHandler = (data) => {
    if (isEmpty(data)) return;

    const newUser = {
      ...currentUser,
      ...data,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    return setCurrentUser(newUser);
  };

  // Función que elimina el usuario actual del almacenamiento local y lo establece como null.
  const logoutHandler = () => {
    localStorage.removeItem("user");
    return setCurrentUser(null);
  };

  // Creamos un objeto que contiene los valores de autenticación y los envolvemos en useMemo para evitar renderizaciones innecesarias.
  const authValues = useMemo(() => {
    return {
      user: currentUser?.user || null, // Obtenemos el usuario del usuario actual.
      token: currentUser?.token, // Obtenemos el token del usuario actual.
      isAuthenticated: !!currentUser?.token, // Comprobamos si hay un token válido en el usuario actual.
      setUser: setUserHandler, // Función que actualiza el usuario actual con la data proporcionada.
      logout: logoutHandler, // Función que elimina el usuario actual del almacenamiento local y lo establece como null.
    };
  }, [currentUser]);

  return (
    // Proporcionamos el contexto de autenticación a todos los componentes secundarios.
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// En resumen, este componente AuthProvider se encarga de proporcionar el contexto de autenticación a todos los componentes secundarios. Utiliza un estado para almacenar el usuario actual y proporciona funciones para actualizar y eliminar el usuario actual del almacenamiento local. También envuelve los valores de autenticación en useMemo para evitar renderizaciones innecesarias.




