import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieView = ({ movie }) => {
  if (!movie) return null;

  const { Title, Description, Genre, Director, ImagePath } = movie;

  return (
    <Row className="justify-content-center">
      <Col md={4}> {/* This will make the card take half the width on medium-sized screens and above */}
        <Card>
          <Card.Img variant="top" src={ImagePath} alt={`Cover of ${Title}`} />
          <Card.Body>
            <Card.Title>{Title}</Card.Title>
            <Card.Text>{Description}</Card.Text>
            <Card.Text>
              <strong>Genre:</strong> {Genre ? Genre.Name : 'N/A'}
            </Card.Text>
            <Card.Text>
              {Genre && Genre.Description}
            </Card.Text>
            <Card.Text>
              <strong>Director:</strong> {Director ? Director.Name : 'N/A'}
            </Card.Text>
            <Card.Text>
              {Director && <div><strong>Bio:</strong> {Director.Bio}</div>}
              {Director && Director.Birth && <div><strong>Birth:</strong> {Director.Birth}</div>}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link to="/" className="btn btn-primary">Back</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

// Prop type validation
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieView;
