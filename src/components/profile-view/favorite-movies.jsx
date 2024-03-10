import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Figure, Button, Card } from 'react-bootstrap';
import './profile-view.scss';


function FavoriteMovies({ favoriteMovieList = [], setFavoriteMovieList }) {
  const removeFav = (id) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    const url = `https://letflix-0d183cd4a94e.herokuapp.com/users/${username}/movies/${movie._id}`;


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
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image
                      src={ImagePath}
                      alt={Title}
                    />
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                  </Link>
                </Figure>
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
