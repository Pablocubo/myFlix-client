import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

const FavoriteMovies = ({ user, favoriteMovies }) => {
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    // Fetch movie details when favoriteMovies or user changes
    fetchMovieDetails();
  }, [favoriteMovies, user]);

  const fetchMovieDetails = async () => {
    // Iterate through favoriteMovies and fetch details for each movie
    const detailsPromises = favoriteMovies.map(async (movie) => {
      try {
        const response = await fetch(`https://letflix-0d183cd4a94e.herokuapp.com/movies/${movie._id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch movie details for movie with ID ${movie._id}`);
        }
        const movieDetails = await response.json();
        return movieDetails;
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    // Wait for all detailsPromises to resolve
    const details = await Promise.all(detailsPromises);
    setMovieDetails(details);
  };

  return (
    <Col className="mb-5">
      <h3 className="title">List of favorite movies</h3>
      <Row>
        {favoriteMovies.map((movieId) => (
          <Col key={movieId} md={6}>
            {movieDetails[index] && (
              <Link to={`/movies/${movie._id}`}>
                <MovieCard
                  key={movie._id}
                  isFavorite={user.FavoriteMovies.includes(movie._id)}
                  movie={movieDetails[index]}
                />
              </Link>
            )}
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

export default FavoriteMovies;
