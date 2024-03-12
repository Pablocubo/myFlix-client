import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";

const FavoriteMovies = ({ user, favoriteMovies, addFav, removeFav }) => {
  return (
    <Col className="mb-5">
      <h3 className="title">List of favorite movies</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={6}>

            <MovieCard
              movie={movie}
              isFavorite={user.FavoriteMovies.includes(movie._id)}

              addFav={() => addFav(movie)} // Assuming addFav/removeFav expect the whole movie object
              removeFav={() => removeFav(movie)}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  favoriteMovies: PropTypes.array.isRequired, // Ensure this prop is validated for better type checking
};

export default FavoriteMovies;
