import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } 
from 'mdb-react-ui-kit';
import { apiURL } from "../config";

const ProfilePage = () => {
  // const [ isAuthenticated, logout, user ] = useAuth()
  // const navigate = useNavigate()
  // const handleLogout = () => {
  //   logout()
  //   navigate("/")
  // }
  // const handleClick = () => {
  //   navigate("/")
  // }

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={`${apiURL}/avatars/${user?.avatar}`}
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography className="text-muted" tag="h5">{user?.username}</MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography className="text-muted" tag="h3">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography className="text-muted" tag="h6">Username</MDBTypography>
                        <MDBCardText className="text-muted">{user?.username}</MDBCardText>
                      </MDBCol>
                    </MDBRow> 
                     <MDBRow className="pt-1">
                       <MDBCol size="6" className="mb-3">
                        <MDBTypography className="text-muted" tag="h6">Contraseña</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography className="text-muted" tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default ProfilePage
