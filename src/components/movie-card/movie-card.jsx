import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap'; // Import Button and Card from react-bootstrap

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
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
    <Card style={{ width: '18rem', height: '21rem' }}>
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
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
  onMovieClick: PropTypes.func.isRequired,
};
