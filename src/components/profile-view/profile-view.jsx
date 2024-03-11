import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import FavoriteMovies from '../profile-view/favorite-movies';
import { UpdateUser } from "./update-user";
import moment from 'moment';
import { Link } from "react-router-dom";

const ProfileView = ({ token, user, movies, onSubmit }) => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  // Initialize state with empty values or defaults
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
   // Format the birthday using Moment.js
   const formattedBirthday = moment(user.birthdate).format('MMMM Do, YYYY');
  
  useEffect(() => {
    if (user) {
      setUsername(user.UserName || "");
      setEmail(user.Email || "");
      setBirthdate(user.Birthdate || "");
    }
  }, [user]);


  const favoriteMovies = movies.filter(m => user?.FavoriteMovies?.includes(m._id));


  // Preparing formData with current state values
  const formData = {
    UserName: username,
    Email: email,
    Password: password,
    Birthdate: birthdate
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send updated user information to the server, endpoint /users/:username
    fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${storedUser.UserName}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Update successful");
          return response.json();
        }
        alert("Update failed");
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        onSubmit(data);
        // Update local state with new user data
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "date":
        setBirthdate(e.target.value);
        break;
      default:
      // It's good practice to handle default case
    }
  }

  const handleDeleteAccount = (id) => {
    fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("The account has been successfully deleted.");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title><h2> Hello {user.username}! </h2></Card.Title>
            <Card.Text>
              <strong>Username:</strong> {user.username}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Card.Text>
              <strong>Birthday:</strong> {formattedBirthday}
            </Card.Text>
            <Button onClick={() => handleDeleteAccount(user._id)} className="button-delete mt-3" type="submit" variant="outline-secondary">
              Delete account
            </Button>
          </Card.Body>
        </Card>
        <Col>
          <UpdateUser
            formData={formData}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </Col>
        <br />
      </Row>
      <hr />
      <Row className="justify-content-center">
      <FavoriteMovies user={user} />
      </Row>
    </>
  );
};

export default ProfileView;
