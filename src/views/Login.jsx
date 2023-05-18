import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import useServer from "../hooks/useServer.js";
import useAuth from "../hooks/useAuth.js";
import { useEffect } from "react";
function Login() {
  const { post, get } = useServer(); // obtiene la función 'post' y 'get' del hook personalizado 'useServer'
  const { token } = useAuth() // obtiene el token de autenticación del hook personalizado 'useAuth'
  const navigate = useNavigate(); // obtiene la función 'navigate' del hook 'useNavigate'
  const handleSubmit = async (e) => { // función que se ejecuta cuando se envía el formulario
    e.preventDefault();
    const credentials = Object.fromEntries(new FormData(e.target)); // obtiene los valores del formulario y los convierte en un objeto
    await post({ url: "/login", body: credentials }); // hace una petición POST a la URL '/login' con las credenciales como cuerpo
  };
  useEffect(() => {
    if (!token) return; // si no hay token, sale de la función
    const usr = get({ url: "/profile" }); // hace una petición GET a la URL '/profile'
    if (usr) return navigate("/"); // si la petición es exitosa, redirige a la página de inicio
  }, [token])
  return (
    <>
    <form onSubmit={handleSubmit}>
    <MDBContainer >
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard  className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Inicio</h2>
              <p className="text-white-50-mb-5">¡Por favor, introduce tu usuario y contraseña!</p>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' name="email" labelClass='text-white' label='Email address' id='email' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name='password' label='Password' id='password' type='password' size="lg"/>
              <p className="small mb-3 pb-lg-2"><a className="text-white-50" >¿Has olvidado tu contraseña?</a></p>
              <MDBBtn outline className='mx-2 px-5' type="submit"  color='white' size='lg'>
                Iniciar Sesion
              </MDBBtn>
              {/* <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div> */}
              <div>
                <p className="mb-0">¿No tienes una cuenta?<a href="/register" className="text-white-50 fw-bold"> Registrate</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </form>
  </>
  );
}
export default Login;