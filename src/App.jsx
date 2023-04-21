import { Routes, Route } from "react-router-dom"
// import { PrivateRoutes } from "./components/PrivateRoutes"
import Navbar from "./components/Navbar"
// Vista principal de pagina
import Homepage from "./views/Homepage"
import Login from "./views/Login"


function App() {
  return (
    <>
    <Navbar />
    <h1 className="tittle">Proyecto Creado</h1>
    <Routes>
      <Route path="/" element= {<Homepage/>}/>
      <Route path="/login" element= {<Login/>}/>

      {/* <Route element= {<PrivateRoutes/>}/> */}
    </Routes>
    </>
  )
}
export default App
