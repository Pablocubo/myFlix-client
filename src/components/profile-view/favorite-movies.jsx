import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Figure, Button, Card } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";
import './profile-view.scss';


function FavoriteMovies({ favoriteMovieList = [], setFavoriteMovieList }) {
  const removeFav = (id) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    const movie = favoriteMovieList.find(movie => movie._id === id); // Resolve movie variable
    const url = `https://letflix-0d183cd4a94e.herokuapp.com/users/${username}/movies/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Handle successful removal by updating the UI
          console.log('Favorite movie removed successfully');
          // Remove the movie from the UI
          setFavoriteMovieList(prevMovies => prevMovies.filter(movie => movie._id !== id));
        } else {
          throw new Error('Failed to remove the movie');
        }
      })
      .catch(error => {
        console.error('Could not remove the movie:', error);
      });
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <MovieCard movie={{ ImagePath, Title, _id }} /> {/* Render MovieCard component */}
                <Button variant="secondary" onClick={() => removeFav(_id)}>Remove</Button>
              </Col>
            )
          })
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FavoriteMovies;
