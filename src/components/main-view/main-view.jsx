import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'; // Ensure it's imported
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";

export const MainView = () => {
  // Safely parse stored user data from localStorage
  let storedUser = null;
  try {
    const userData = localStorage.getItem("user");
    storedUser = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }

  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://letflix-0d183cd4a94e.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
            Death: movie.Director.Death // Include the 'Death' field if it exists in the backend schema 
          },
          Actors: movie.Actors,
          Bio: movie.Bio,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle error if needed
      });
  }, [token]);


  const onLoggedIn = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  return (
    <BrowserRouter>
      <Navbar bg="ligth" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand >LetFlix</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!user ? (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Movies</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={
            !user ? (
              <>
                <Row>
                  <Col>
                    <LoginView onLoggedIn={onLoggedIn} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SignupView />
                  </Col>
                </Row>
              </>
            ) : movies.length === 0 ? (
              <div>The list is empty!</div>
            ) : (
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {movies.map((movie) => (
                  <Col key={movie._id} xs={12} md={4}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            )
          } />
          {movies.map((movie) => (
            <Route key={movie._id} path={`/movies/${movie._id}`} element={<MovieView movie={movie} />} />
          ))}
          <Route path="/profile" element={<ProfileView />} />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={10}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route path="/signup" element={
        <>
          {user ? (
            <Navigate to="/" />
          ) : (
            <Col md={10}>
              <SignupView onSignedUp={(user) => setUser(user)} />
            </Col>
          )}
        </>
      }/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};