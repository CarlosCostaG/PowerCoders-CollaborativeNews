import { useNavigate } from "react-router-dom";
import useServer from "../hooks/useServer.js";
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Register() {
  const { post } = useServer();  // Se utiliza el hook useServer para hacer solicitudes al servidor
  const navigate = useNavigate(); // Se utiliza el hook useNavigate para cambiar la ruta del navegador

  const handleSubmit = async (e) => { // Función que se ejecuta cuando se envía el formulario
    e.preventDefault(); // Se previene la acción por defecto de enviar el formulario

    const userRegistration = new FormData(e.target); // Se crea un nuevo objeto FormData con los datos del formulario
    const register = await post({ url: "/register", body: userRegistration, hasImage: true }); // Se hace una solicitud al servidor para registrar al usuario
    if (register) return navigate("/login"); // Si la solicitud es exitosa, se redirige al usuario a la página de inicio de sesión
  };

  return (
    <form onSubmit={handleSubmit}>

   <MDBContainer fluid>

<div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

<MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
  <MDBCardBody className='p-5 text-center'>

    <h2 className="fw-bold mb-5">Regístrate ahora</h2>

    <MDBRow>
      <MDBCol col='6'>
        <MDBInput wrapperClass='mb-4' name="username" label='username' id='username' type='text'/>
      </MDBCol>
    </MDBRow>

    <MDBInput wrapperClass='mb-4' name="email" label='email' id='email' type='email'/>
    <MDBInput wrapperClass='mb-4' name="password" label='Password' id='password' type='password'/>
      <div className="text-center">
        <label htmlFor="avatar">Avatar</label>
        <input type="file" name="avatar" id="avatar" />
      </div>
    <MDBBtn type="submit" className='w-100 mb-4' size='md'>Crear Cuenta</MDBBtn>


  </MDBCardBody>
</MDBCard>

</MDBContainer>
  
</form>
);
}

export default Register;
