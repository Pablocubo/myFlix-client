import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { NavigationBar } from '../navigation-bar/navigation-bar';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import FavoriteMovies from '../profile-view/favorite-movies';


export const MainView = () => {
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  });

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (token) {
      fetchMovies();
    }
  }, [token]);

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://letflix-0d183cd4a94e.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMovies(data.map(movie => ({ ...movie, ImagePath: movie.ImagePath, Featured: movie.Featured })));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const favoriteMovies = useMemo(() => movies.filter(movie => favorites.includes(movie._id)), [movies, favorites]);

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