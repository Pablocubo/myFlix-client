import PropTypes from 'prop-types';
import { Button, Card, } from 'react-bootstrap'; // Import Button and Card from react-bootstrap
import { Link } from 'react-router-dom';
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
  const handleAddFav = () => {
    addFav(movie._id); // Assuming this function updates the isFavorite state
  };

  const handleRemoveFav = () => {
    removeFav(movie._id); // Assuming this function updates the isFavorite state
  };

  return (
    <Card className="h-100 mt-5 card-shadow">
      <div className="position-relative d-inline-block">
        <Card.Img variant="top" src={movie.ImagePath} />
        <div>
          {isFavorite ? (
            <BookmarkHeartFill size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={handleRemoveFav} />
          ) : (
            <BookmarkHeart size={40} color="#87CEFA" className="fav-button mt-2 me-2 top-0 end-0" onClick={handleAddFav} />
          )}
        </div>
      </div>
      <Card.Body>
        <Card.Title style={{ fontSize: '20px', fontWeight: 'bold' }}>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link" className="text-decoration-none">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired
};

export default MovieCard;
