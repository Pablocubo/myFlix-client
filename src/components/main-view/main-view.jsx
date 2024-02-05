import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("SIGNUP_URL", {
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
        Birth: movie.Director.Birth
      }
    }));

    setMovies(moviesFromApi);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    // Handle error if needed
  });
}, [token]);

  
    if (!user) {
      return (
        <>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
        or
        <SignupView />
        </>
      );
    }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} md={4}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
            />
          </Col>
        ))}
      </Row>
      <button onClick={() => { setUser(null); setToken(null) }}>Logout</button>
    </Container>
  );
};
