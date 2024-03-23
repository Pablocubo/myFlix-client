import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss'

export const MovieView = ({ movie }) => {
  if (!movie) return null;

  const { Title, Description, Genre, Director, ImagePath } = movie;

  return (
    <Row className="justify-content-center movie-view">
      <Col md={8} lg={6}>
        <Card className="movie-card">
          <Card.Img variant="top" src={ImagePath} alt={`Cover of ${Title}`} className="movie-image" />
          <Card.Body className="movie-body">
            {/* <Card.Title className="movie-title">{Title}</Card.Title> */}
            <Card.Text className="movie-description">{Description}</Card.Text>
            <div className="movie-info">
              <strong>Genre:</strong> {Genre ? Genre.Name : 'N/A'}
            </div>
            <div className="movie-info">
              {Genre && Genre.Description}
            </div>
            <div className="movie-info">
              <strong>Director:</strong> {Director ? Director.Name : 'N/A'}
            </div>
            <div className="movie-info">
              {Director && <><strong>Bio:</strong> {Director.Bio}</>}
                          </div>
          </Card.Body>
          <Card.Footer className="movie-footer">
            <Link to="/" className="btn btn-primary movie-back-button">Back</Link>
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
