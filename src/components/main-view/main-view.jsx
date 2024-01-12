import { useState } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'The Shawshank Redemption',
      Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      Genre: {
        Name: 'Drama',
        Description: 'Movies portraying realistic or fictional human emotions and experiences.'
      },
      Director: {
        Name: 'Frank Darabont',
        Bio: 'Director known for various acclaimed films.',
        Birth: '1959',
        Death: ''
      },
      ImagePath: 'shawshank_redemption.jpg',
      Featured: true
    },
    {
      id: 2,
      Title: 'The Godfather',
      Description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      Genre: {
        Name: 'Crime',
        Description: 'Movies involving criminal activities, investigations, and schemes.'
      },
      Director: {
        Name: 'Francis Ford Coppola',
        Bio: 'Director known for various acclaimed films.',
        Birth: '1939',
        Death: ''
      },
      ImagePath: 'godfather.jpg',
      Featured: true
    },
    // Add more movie objects as needed
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} md={4}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}