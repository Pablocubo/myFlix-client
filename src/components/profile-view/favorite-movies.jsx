import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ user }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${user.username}/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT for authentication
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

    // Clean up function (optional)
    return () => {
      // Perform any cleanup here if necessary
    };
  }, [user.Username]); // Dependency array ensures useEffect runs when username changes

  if (!favoriteMovies || favoriteMovies.length === 0) {
    return (
      <Col>
        <h3 className="title">List of favorite movies</h3>
        <p>You have no favorite movies added.</p>
      </Col>
    );
  }

  return (
    <Col className="mb-5">
      <h3 className="title">List of favorite movies</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={3}>
            <Link to={`/movies/${movie._id}`}>
              <MovieCard
                key={movie._id}
                // Ensure user and user.FavoriteMovies are defined before using .includes
                isFavorite={user && user.FavoriteMovies ? user.FavoriteMovies.includes(movie._id) : false}
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
  user: PropTypes.object.isRequired
};
