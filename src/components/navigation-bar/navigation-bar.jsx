import React, { useState } from 'react';
import { Row, Col, Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '../theme-context/theme-context';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  const { theme, toggleTheme } = useTheme();
  /* const [mode, setMode] = useState('day'); */
  const navigate = useNavigate();

  const handleLogout = () => {
    // Assuming onLoggedOut clears the user session (e.g., removing tokens from local storage)
    if (onLoggedOut) {
      onLoggedOut();
    }
    // Redirect to login page
    navigate('/login');
  };
/*   const toggleMode = () => {
    setMode(mode === 'day' ? 'night' : 'day');
  }; */

  return (
    <Row>
      <Col className="w-100">
        <Navbar className="navBar" expand="md">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <span className="h1 navbar-logo">Letflix</span>
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Button onClick={toggleTheme} variant="outline-secondary" className="ms-auto me-2 fixed-size-button">
              {theme === 'day' ? 'Night' : 'Day'} Mode
            </Button>
              <Nav className="h5 mt-1">
                {!user && (
                  <>
                    <Nav.Link className="navLink" as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link className="navLink" as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link className="navLink" as={Link} to="/">
                      Home
                    </Nav.Link>
                    <Nav.Link className="navLink" as={Link} to={'/profile'}>
                      Profile
                    </Nav.Link>

                    <Nav.Link className="navLink" onClick={handleLogout}>Logout</Nav.Link>
                  </>
                )}
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Col>
    </Row>
  )
};