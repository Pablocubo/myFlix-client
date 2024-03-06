import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap'; // Import Button and Card from react-bootstrap
import { Link } from 'react-router-dom';
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFavorite, removeFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = () => {
    addFavorite(movie);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(movie._id);
    setIsFavorite(false);
  };

  return (
    <Col xs={4} sm={6} md={4} lg={3} className="mb-4">
      <Card className="mb-4 mb-lg-0" style={{ width: '18rem', height: '21rem' }}>
        <Card.Img variant="top card-img" src={movie.ImagePath} alt={movie.Title} />
        
        <Card.Body className="d-flex flex-column"> {/* Esto permite organizar el contenido de manera vertical */}
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="flex-grow-1">{movie.Description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            {isFavorite ? (
              <button className="btn btn-danger" onClick={handleRemoveFavorite}>Remove Favorite</button>
            ) : (
              <button className="btn btn-primary" onClick={handleAddFavorite}>Add to Favorites</button>
            )}
            <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="btn btn-link">Open</Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

// Define the PropTypes for the MovieCard component
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default MovieCard;