import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { FavoriteMovies } from '../profile-view/favorite-movies';

export const MainView = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(user?.FavoriteMovies || []);


  useEffect(() => {
    // Fetch movies or other user-specific data here if needed
    if (token) {
      fetchMovies();
    }
  }, [token]); // This useEffect is dependent on `token` to fetch movies
  
  useEffect(() => {
    // This useEffect is for synchronizing the user state with localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFavorites(storedUser.FavoriteMovies || []);
    }
  }, []); 
  

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
    const username = user?.UserName || null; 

    fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add the favorite movie');
      }
      return response.json();
    })
    .then(() => {
      /* alert("Favorite movie added successfully!"); */
      
      // Optimistically update the UI and local storage
      const updatedFavorites = [...favorites, movie._id];
      setFavorites(updatedFavorites);

      const updatedUser = {...user, FavoriteMovies: updatedFavorites};
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    })
    .catch(error => {
      console.error('Error adding favorite movie:', error);
      alert(error.message); // More sophisticated user feedback could be implemented here
    });
  };
  
  const removeFav = async (movie) => {
    const username = user?.UserName; // Ensuring this matches your user object structure
    if (!username) {
      console.error("User's username is missing.");
      return;
    }
    const url = `https://letflix-0d183cd4a94e.herokuapp.com/users/${username}/movies/${movie._id}`;
  
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
  
        if (!response.ok) {
            throw new Error('Failed to remove the favorite movie');
        }
  
        // Optimistically update UI
        const updatedFavorites = favorites.filter(favMovieId => favMovieId !== movie._id);
        setFavorites(updatedFavorites);
  
        // Update user object in localStorage, if needed
        updateUserInLocalStorage(updatedFavorites);
    } catch (error) {
        console.error('Error removing favorite movie:', error);
        alert("Error removing favorite movie");
    }
  };
  


  
  const onLoggedIn = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setFavorites(data.user.FavoriteMovies || []); 
    navigate('/'); 
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    return <Navigate to="/login" />;
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
          {user && user.favoriteMovies && <Route path="/favorites" element={<FavoriteMovies user={user} favoriteMovies={favoriteMovies} />} />}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};