import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ user, removeFav }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && user.username) {
      const fetchFavoriteMovies = async () => {
        try {
          const response = await fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${user.username}/favorites`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch favorite movies');
          }
          const data = await response.json();
          setFavoriteMovies(data);
        } catch (error) {
          console.error('Error fetching favorite movies:', error);
        }
      };

      fetchFavoriteMovies();
    }
  }, [user.username]);// Ensure useEffect runs when username changes

  if (!favoriteMovies || favoriteMovies.length === 0) {
    return (
      <Col>
        <h3 className="title">List of favorite movies</h3>
        <p>You have no favorite movies added.</p>
      </Col>
    );
  }
    // Callback function for updating the local state upon movie removal
    const onMovieRemoved = (removedMovieId) => {
      setFavoriteMovies(prevMovies => prevMovies.filter(movie => movie._id !== removedMovieId));
    };

  return (
    <Col className="mb-5">
      <h3 className="title">Your Favorite Movies</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={3}>
            <MovieCard
              movie={movie}
              removeFav={() => removeFav(movie, onMovieRemoved)}
              addFav={() => {}} // Added a placeholder function to avoid errors
              isFavorite={true}
              onMovieRemoved={onMovieRemoved} 
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  user: PropTypes.object.isRequired,
  removeFav: PropTypes.func.isRequired, // Ensure removeFav is a required prop
  
};
