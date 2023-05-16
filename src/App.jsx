import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import "./App.css"
// Vista principal de pagina
import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Register from './views/Register'
import "./style.css";
// import useAuth from "./hooks/useAuth";
import RedditForm from "./components/PublishPost";
import ProfileView from "./views/Profile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import ProfilePage from "./views/ProfilePage";

function App() {
  // const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar />
      <ToastContainer /> {/* Agrega el ToastContainer aquí */}

      <Routes className="routes">
        {/* Rutas públicas */}
        <Route path="/" element={<Homepage />} /> {/* Ruta de la página principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta para iniciar sesión */}
        <Route path="/register" element={<Register />} /> {/* Ruta para registrarse */}

        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}> {/* Rutas accesibles solo para usuarios autenticados */}
          <Route path="/publish-post" element={<RedditForm />} /> {/* Ruta para enviar una publicación */}
          <Route path="/profile" element={<ProfileView/>}/>
          {/* <Route path="/profile" element={<ProfilePage />} /> Ruta a la página del perfil del usuario */}

        </Route>
      </Routes>
    </>
  );
}
export default App;
