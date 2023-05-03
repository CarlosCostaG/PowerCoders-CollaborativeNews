import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import "./App.css"
// Vista principal de pagina
import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Register from './views/Register'
import "./style.css";
import useAuth from "./hooks/useAuth";
import RedditForm from "./components/send";
import Notifications from "./components/Notifications"
import ProfileView from "./views/Profile";
// import ProfilePage from "./views/ProfilePage";

function App() {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar />
      <Notifications/>


      {/* {isAuthenticated && <img className="avatar" src={`https://noticias.backends.hackaboss.com/avatars/${user.avatar}`}/>} */}

      <Routes className="routes">
        {/* Rutas públicas */}
        <Route path="/" element={<Homepage />} /> {/* Ruta de la página principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta para iniciar sesión */}
        <Route path="/register" element={<Register />} /> {/* Ruta para registrarse */}

        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}> {/* Rutas accesibles solo para usuarios autenticados */}
          <Route path="/send" element={<RedditForm />} /> {/* Ruta para enviar una publicación */}
          <Route path="/profile" element={<ProfileView/>}/>
          {/* <Route path="/profile" element={<ProfilePage />} /> Ruta a la página del perfil del usuario */}

        </Route>
      </Routes>
    </>
  );
}
export default App;
