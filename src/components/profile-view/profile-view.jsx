import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import { PersonSquare } from 'react-bootstrap-icons';
import MovieCard from '../movie-card/movie-card';
import FavoriteMovies  from '../profile-view/favorite-movies';

const ProfileView = ({ user, movies, setUser, addFav, removeFav }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const [username, setUsername] = useState(user?.Username || '');
  const [email, setEmail] = useState(user?.Email || '');
  const [birthday, setBirthday] = useState(user ? moment(user.Birthday).utc().format('YYYY-MM-DD') : '');
  

  const favoriteMoviesFromApi = user ? movies.filter(m => user.FavoriteMovies?.includes(m._id)) : [];

// useEffect to synchronize state with user prop changes
useEffect(() => {
  setUsername(user?.Username || '');
  setEmail(user?.Email || '');
  setBirthday(user ? moment(user.Birthday).utc().format('YYYY-MM-DD') : '');
  setFavoriteMovieList(favoriteMoviesFromApi);
}, [user, favoriteMoviesFromApi]); // Depend on user and favoriteMoviesFromApi props to limit executions

 /*  // Optimized favorite movies list to avoid unnecessary operations
  const favoriteMovieList = React.useMemo(() => movies.filter(m => user?.FavoriteMovies?.includes(m._id)), [movies, user]);
 */
  //Update User
  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${user._id}`, {
        method: 'PUT', // or 'PATCH' if you're partially updating the resource
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Assuming your API uses bearer token authentication
        },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Birthday: birthday,
        }),
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      const updatedUser = await response.json();
      setUser(updatedUser); // Update the user state in your component or context
      alert('Profile updated successfully.');
    } catch (error) {
      console.error('Failed to update the profile:', error);
      alert('Failed to update the profile.');
    }
  };
  //Delete User
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile?')) return;
  
    try {
      const response = await fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Note the Bearer schema // Assuming your API uses bearer token authentication
        },
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      // Handle what happens after a successful deletion
      // e.g., navigate to a login page, clear user state
      setUser(null); // or however you manage the user state
      navigate('/login');
      alert('Profile deleted successfully.');
    } catch (error) {
      console.error('Failed to delete the profile:', error);
      alert('Failed to delete the profile.');
    }
  };
  

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <PersonSquare variant="top" color="lightblue" className="my-4 center-person-square" size={180} />
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {birthday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className="mt-5">
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" onClick={handleUpdate} className="mt-3 me-2">Update Profile</Button>

            <Button onClick={handleDelete} variant="danger" className="mt-3" block>Delete User</Button>
          </Form>
        </Col>
      </Row>
      <Row>
      <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
      <Row className="justify-content-center">
        {favoriteMovieList.length > 0 ? favoriteMovieList.map(({ ImagePath, Title, _id }) => (
          <Col sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img" key={_id}>
            <Link to={`/movies/${id}`} style={{ textDecoration: 'none' }}>
              <Figure>
                <Figure.Image src={ImagePath} alt={Title} />
                <Figure.Caption>{Title}</Figure.Caption>
              </Figure>
            </Link>
            <Button variant="secondary" onClick={() => removeFav(_id)}>Remove</Button>
          </Col>
        )) : <Col><p>There are no favorite movies.</p></Col>}
      </Row>
      </Row>
    </Container>
  );
};

export default ProfileView;
