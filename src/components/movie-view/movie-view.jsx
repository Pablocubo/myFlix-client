import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null; // Handle case when movie data is not available

  const { Title, Description, Genre, Director, ImagePath } = movie;

  return (
    <div>
      <div>
        <img src={ImagePath} alt={Title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{Genre ? Genre.Name : ''}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{Genre ? Genre.Description : ''}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{Director ? Director.Name : ''}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{Director ? Director.Bio : ''}</span>
      </div>
      <div>
        <span>Birth: </span>
        <span>{Director ? Director.Birth : ''}</span>
      </div>
      <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
    </div>
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
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string),
    Bio: PropTypes.string,
    Featured: PropTypes.bool
  }),
  onBackClick: PropTypes.func.isRequired
};


