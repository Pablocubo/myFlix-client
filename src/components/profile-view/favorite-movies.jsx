import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ user }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Assuming user.favoriteMovies is an array of movie IDs initially
    // Adjusted to check if user.favoriteMovies is truthy before setting
    if (user && user.favoriteMovies) {
      // Here, you would fetch the movie details based on the IDs or ensure favoriteMovies contains detailed movie objects
      setFavoriteMovies(user.favoriteMovies);
    }
  }, [user]);

  // Handling for when favoriteMovies is empty
  if (favoriteMovies.length === 0) {
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
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={4}>
            <Link to={`/movies/${movie._id}`}>
              <MovieCard
                isFavorite={user.favoriteMovies.includes(movie._id)}
                movie={movie} />
            </Link>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  user: PropTypes.shape({
    favoriteMovies: PropTypes.array, // This allows the array to be initially undefined
  }),
};

