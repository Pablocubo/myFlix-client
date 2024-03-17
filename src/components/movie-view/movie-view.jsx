import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieView = ({ movie }) => {
  if (!movie) return null;

  const { Title, Description, Genre, Director, ImagePath } = movie;

  return (
    <Row className="justify-content-center">
      <Col md={4}>
        <Card>
          <Card.Img variant="top" src={ImagePath} alt={`Cover of ${Title}`} />
          <Card.Body>
            <Card.Title>{Title}</Card.Title>
            <Card.Text>{Description}</Card.Text>
            <div>
              <strong>Genre:</strong> {Genre ? Genre.Name : 'N/A'}
            </div>
            <div>
              {Genre && Genre.Description}
            </div>
            <div>
              <strong>Director:</strong> {Director ? Director.Name : 'N/A'}
            </div>
            <div>
              {Director && <><strong>Bio:</strong> {Director.Bio}</>}
              {Director && Director.Birth && <><strong>Birth:</strong> {Director.Birth}</>}
            </div>
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
