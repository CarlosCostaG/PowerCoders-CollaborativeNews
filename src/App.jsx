import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
// Vista principal de pagina
import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Register from './views/Register'
import "./style.css";
import useAuth from "./hooks/useAuth";
import RedditForm from "./components/send";
// import RedDelete from "./components/delete";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Navbar />

      <h1 className="tittle">InsightHub</h1>
      <div>{JSON.stringify({ isAuthenticated })}</div>

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
