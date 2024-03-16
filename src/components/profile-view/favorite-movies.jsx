import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ user }) => {
  const [favoriteMoviesDetails, setFavoriteMoviesDetails] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Clear existing movie details
      setFavoriteMoviesDetails([]);

      // Assuming user.FavoriteMovies contains movie IDs
      const movieDetailsPromises = user.FavoriteMovies.map(movieId =>
        fetch(`https://letflix-0d183cd4a94e.herokuapp.com/movies/${movieId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(error => console.error('There has been a problem with your fetch operation:', error))
      );

      // Wait for all fetches to complete and then set the state with the new movie details
      Promise.all(movieDetailsPromises)
        .then(details => setFavoriteMoviesDetails(details))
        .catch(error => console.error('Error fetching movie details:', error));
    };

    if (user && user.FavoriteMovies) {
      fetchMovieDetails();
    }
  }, [user, user.FavoriteMovies]); // Re-run when user or their FavoriteMovies change

  if (favoriteMoviesDetails.length === 0) {
    return (
      <Col>
        <h3>List of Favorite Movies</h3>
        <p>No favorite movies to display.</p>
      </Col>
    );
  }

  return (
    <Col>
      <h3>List of Favorite Movies</h3>
      <Row>
        {favoriteMoviesDetails.map(movie => (
          <Col key={movie._id} md={4}>
            <Link to={`/movies/${movie._id}`}>
              <MovieCard
                isFavorite={true} // If this component is rendering, it's a favorite by default
                movie={movie}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
};