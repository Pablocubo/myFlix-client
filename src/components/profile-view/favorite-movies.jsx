import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

const FavoriteMovies = ({ user }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && user.favoriteMovies) {
      const fetchFavoriteMovies = async () => {
        const moviesDetailsPromises = user.favoriteMovies.map(async (movieId) => {
          try {
            const response = await fetch(`https://letflix-0d183cd4a94e.herokuapp.com/movies/${movieId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch movie details.');
            }
            return await response.json();
          } catch (error) {
            console.error("Error fetching movie details:", error);
            return null;
          }
        });

        const moviesDetails = await Promise.all(moviesDetailsPromises);
        setFavoriteMovies(moviesDetails.filter(movie => movie !== null));
      };

      fetchFavoriteMovies();
    }
  }, [user]);

  return (
    <Col>
      <h3>List of Favorite Movies</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={4}>
            <Link to={`/movies/${movie._id}`}>
              <MovieCard 
                key={movie._id}
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
    favoriteMovies: PropTypes.arrayOf(PropTypes.string), // Adjust prop type to allow undefined initially
  }),
};

export default FavoriteMovies;