import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Figure, Button, Card } from 'react-bootstrap'; 
import axios from 'axios'; // Import axios here
import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList = [] }) { // Default to an empty array if favoriteMovieList is not provided
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user'); // Ensure 'user' is correctly retrieved
    let url = `https://letflix-0d183cd4a94e.herokuapp.com/users/${user}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` }, // Corrected typo from 'Authoriation' to 'Authorization'
    })
    .then(response => {
      // Handle successful removal here, possibly by updating state to remove the movie from the UI
      console.log(response.data);
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

export default FavoriteMovies