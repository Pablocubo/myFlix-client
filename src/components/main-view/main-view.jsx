import React, { useState, useEffect } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";
import FavoriteMovies from "../profile-view/favorite-movies";

export const MainView = () => {
  let storedUser = null;
  try {
    const userData = localStorage.getItem("user");
    storedUser = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch movies when token changes
    if (token) {
      fetchMovies();
    }
  }, [token]);

  const fetchMovies = () => {
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
            Death: movie.Director.Death
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
      });
  };

  const addFavorite = (movie) => {
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    const token = localStorage.getItem("token")
    fetch("https://letflix-0d183cd4a94e.herokuapp.com/user/" + username + "/movies/" + movie._id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data)
        setFavorites([...favorites, movie]);
      })
      .catch((error) => {
        console.error('Error adding favorite movie:', error);
      });
  };

  const removeFavorite = (movieId) => {
    setFavorites(favorites.filter((movie) => movie._id !== movieId));
  };

  const onLoggedIn = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar onLoggedOut={onLoggedOut} user={user} />
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
              <>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                  {movies.map((movie) => (
                    <Col key={movie._id} xs={12} md={4}>
                      <MovieCard
                        movie={movie}
                        addFavorite={addFavorite}
                        removeFavorite={removeFavorite}
                      />
                    </Col>
                  ))}
                </Row>
                <FavoriteMovies favoriteMovieList={favorites} removeFav={removeFavorite} />
              </>
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
                    <LoginView onLoggedIn={setUser} />
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
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};