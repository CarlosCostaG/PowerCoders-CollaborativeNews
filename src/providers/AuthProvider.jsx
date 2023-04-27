import { useMemo, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import isEmpty from "../helpers/isEmpty";

const AuthProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("user")) || {};
  const [currentUser, setCurrentUser] = useState(localUser);

  const setUserHandler = (data) => {
    if (isEmpty(data)) return;

    const newUser = {
      ...currentUser,
      ...data,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    return setCurrentUser(newUser);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    return setCurrentUser(null);
  };


  const authValues = useMemo(() => {
    return {
      user: currentUser?.user || null,
      token: currentUser?.token,
      isAuthenticated: !!currentUser?.token,
      setUser: setUserHandler,
      logout: logoutHandler,
    };
  });

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
