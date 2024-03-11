import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import FavoriteMovies from '../profile-view/favorite-movies';

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
    // Fetch movies when token changes (working good movies are being fethed)
    if (token) {
      fetchMovies();
    }
  }, [token]);

  const favoriteMovies = useMemo(() => movies.filter(movie => user?.FavoriteMovies?.includes(movie._id)), [movies, user?.FavoriteMovies]);

  
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

  const addFav = (movie) => {
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    const token = localStorage.getItem("token");
    fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${username}/movies/${movie._id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        if (response.ok) {
            alert("Favorite movie added successfully!");
            
            setFavorites(prevFavorites => [...prevFavorites, movie._id]);
        } else {
            alert("Error adding favorite movie");
            throw new Error('Failed to add the favorite movie');
        }
    })
    .catch(error => {
        console.error('Error adding favorite movie:', error);
    });
  };
  
  const removeFav = (movie) => {
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    const token = localStorage.getItem('token');
    fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
     .then(async (response) => {
      if (response.ok) {
        console.log('Favorite movie removed successfully');
        setFavorites(prevFavorites => prevFavorites.filter(favMovieId => favMovieId !== movie._id)); // Use setFavorites from props
      } else {
        throw new Error('Failed to remove the favorite movie');
      }
    })
      .catch(error => {
        console.error('Error removing favorite movie:', error);
      });
  };
  
  const onLoggedIn = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setFavorites(data.user.FavoriteMovies || []); // Make sure FavoriteMovies is an array of movie objects or IDs
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
                        movie={movie} // Pass the whole movie object to MovieCard, show all the movie details
                        addFav={() => addFav(movie)}
                        removeFav={() => removeFav(movie)}  // Pass the movie id to removeFav only id needed for remove
                        isFavorite={favorites.includes(movie._id)}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            )
          } />
          {movies.map((movie) => (
            <Route key={movie._id} path={`/movies/${movie._id}`} element={<MovieView movie={movie} />} />
          ))}
          <Route path="/profile" element={<ProfileView user={user} movies={movies} setUser={setUser} addFav={addFav} removeFav={removeFav} />} />
          <Route path="/favorites" element={<FavoriteMovies user={user} favoriteMovies={favoriteMovies} />} />
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