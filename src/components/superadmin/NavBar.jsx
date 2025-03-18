import React, {useState} from 'react'
import {useAuth} from '../../context/authContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const logOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };
  return (
    <Navbar expand="lg" bg='primary' data-bs-theme="dark">
      <Container>
        <Navbar.Brand >Bienvenido: {user.nombre}{" "}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"> 
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            </Nav>         
          <Form className="mx-5">
            <Button className='me-3' variant="outline-danger" onClick={() => logOut()}>Salir</Button>
            <Button variant="outline-info" onClick={() => navigate('/admin-general/alta')}>Agregar Usuario</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;