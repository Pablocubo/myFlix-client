import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://letflix-0d183cd4a94e.herokuapp.com/movies')
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => ({
            _id: movie._id,
            title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth
              
            }
          }));
    
          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          // Handle error if needed
        });
    }, []);

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
};
