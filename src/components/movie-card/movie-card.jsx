import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import "./movie-card.scss";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
  const handleAddFav = () => addFav(movie._id);
  const handleRemoveFav = () => removeFav(movie);

  return (
    <Card className="h-100 mt-5 card-shadow">
      <div className="card-container position-relative d-inline-block">
        <Card.Img variant="top" src={movie.ImagePath} alt={`Cover for ${movie.Title}`} />
        <div>
          {!isFavorite ? (
            <BookmarkHeart size={40} color="#87CEFA" className="fav-button mt-2 me-2 top-0 end-0" onClick={handleAddFav} />
          ) : (
            <BookmarkHeartFill size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={handleRemoveFav} />
          )}
        </div>
      </div>
      <Card.Body className="d-flex flex-column align-items-center mt-2">
        <Card.Title className="movie-card-title mb-2">{movie.Title}</Card.Title>
        <Card.Text className="mb-2">{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>
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
    _id: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MovieCard;
