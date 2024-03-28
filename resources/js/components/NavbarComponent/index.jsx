import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-cit.png';

function BasicExample() {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.post(`${window.location.origin}/api/logout`, null, config);
                localStorage.removeItem('token');
                console.log('Logout exitoso');
                navigate('/');
            } else {
                console.error('No se encontró ningún token en el localStorage');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleRoute = (route) => {
        navigate(`/${route}`);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" style={{ backgroundColor: '#eb5d1e' }}>
            <Container className="justify-content-between"
                style={{ display: 'flex', justifyContent: 'space-between' }} >
                <img src={logo} width={'40rem'} alt="" sizes="" srcset="" />
                <Navbar.Brand href="/" style={{ marginRight: '10rem' }}>Brilliant Minds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => handleRoute('register')} style={{ color: '#eb5d1e' }}>Register</Nav.Link>
                        <Nav.Link onClick={() => handleRoute('categorie')} style={{ color: '#eb5d1e' }}>Categories</Nav.Link>
                        <Nav.Link onClick={() => handleRoute('contact')} style={{ color: '#eb5d1e' }}>Contact</Nav.Link>
                        <Nav.Link onClick={() => handleRoute('courses')} style={{ color: '#eb5d1e' }}>Courses</Nav.Link>
                        <Nav.Link onClick={() => handleRoute('messages')} style={{ color: '#eb5d1e' }}>Messages</Nav.Link>
                        <Nav.Link onClick={() => handleRoute('projects')} style={{ color: '#eb5d1e' }}>Projects</Nav.Link>
                        <Nav.Link onClick={() => handleRoute('team')} style={{ color: '#eb5d1e' }}>Team</Nav.Link>
                        <NavDropdown title="Acount" id="basic-nav-dropdown" style={{ color: '#eb5d1e' }}>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>
                                Cerrar Sesion
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
