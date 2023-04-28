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
// import RedDelete from "./components/delete";
import Notifications from "./components/Notifications"

function App() {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar />
      <Notifications/>
      <div>{}</div>

      <h1 className="tittle">InsightHub</h1>
      <div>{JSON.stringify({ isAuthenticated })}</div>

      {isAuthenticated && <img className="avatar" src={`https://noticias.backends.hackaboss.com/avatars/${user.avatar}`}/>}

      <Routes className="routes">
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/send" element={<RedditForm />} />
          {/* <Route path="/delete" element={<RedDelete />} /> */}
        </Route>
      </Routes>
    </>
  );
}
export default App;
