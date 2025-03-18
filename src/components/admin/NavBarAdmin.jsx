import React from 'react'
import {useAuth} from '../../context/authContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBarAdmin = () => {
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
          <Nav.Link className='btn btn-dark me-1 mt-1' href="/admin/altapase">Agregar Pase E/S</Nav.Link>
          <Nav.Link className='btn btn-dark me-1 mt-1' href="/admin">Ver Pase E/S</Nav.Link>
          <Nav.Link className='btn btn-danger me-1 mt-1' onClick={() => logOut()}>Salir</Nav.Link>
      </Nav>    
      </Navbar.Collapse>
    </Container>
  </Navbar>
)
}

export default NavBarAdmin