import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap'; // Import Button and Card from react-bootstrap
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, onMovieClick }) => {
  const [imageAccessible, setImageAccessible] = useState(false);

  useEffect(() => {
    const imageUrl = movie.ImagePath;

    const checkImageAccessibility = async (imageUrl) => {
      try {
        const img = new Image();
        img.onload = () => setImageAccessible(true);
        img.onerror = () => setImageAccessible(false);
        img.src = imageUrl;
      } catch (error) {
        console.error('Error checking image accessibility:', error);
        setImageAccessible(false);
      }
    };

    checkImageAccessibility(imageUrl);
  }, [movie]);

  return (
    <Col xs={4} sm={6} md={4} lg={3} className="mb-4">
      <Card className="mb-4 mb-lg-0" style={{ width: '18rem', height: '21rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
        <Card.Body className="d-flex flex-column"> {/* Esto permite organizar el contenido de manera vertical */}
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text className="flex-grow-1">{movie.Description}</Card.Text> {/* Asegura que el texto llene el espacio disponible, empujando el botón hacia abajo */}
      <Link to={`/movies/${movie._id}`} className="mt-auto btn btn-link"> {/* Coloca el enlace en la parte inferior */}
        Open
      </Link>
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
};

export default MovieCard;