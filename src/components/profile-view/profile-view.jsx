import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import UserInfo from './user-info';
import UpdateUser from './update-user';

export default function ProfileView() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
      const response = await axios.get(`https://letflix-0d183cd4a94e.herokuapp.com/users/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
      setFavoriteMovieList(response.data.FavoriteMovies);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have a form to update user info, you would send a request here
    // This is a placeholder implementation
    alert('User info updated!');
  };

  const handleUpdate = (e) => {
    // This function could be used to update the user's state as they type in a form field
    // Assuming the form fields are controlled components, here's a basic example:
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const removeFav = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://letflix-0d183cd4a94e.herokuapp.com/users/movies/${movieId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Remove the movie from favoriteMovieList state to update UI
      setFavoriteMovieList(favoriteMovieList.filter(movie => movie._id !== movieId));
    } catch (error) {
      setError(error.toString());
    }
  };

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h4>Favorite Movies</h4>
              <Row>
                {favoriteMovieList.map(({ ImagePath, Title, _id }) => (
                  <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                    <Card>
                      <Card.Img variant="top" src={ImagePath} alt={Title} />
                      <Card.Body>
                        <Card.Title>{Title}</Card.Title>
                        <Button variant="secondary" onClick={() => removeFav(_id)}>Remove</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
