import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function ProfileView({ movies, onUpdateUserInfo }) {
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
      const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username: null;
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

  const handleUpdate = (e) => {
    // This function could be used to update the user's state as they type in a form field
    // Assuming the form fields are controlled components, here's a basic example:
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
        </Col>
      </Row>
      <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} />
    </Container>
  );
}
