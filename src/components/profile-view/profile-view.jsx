import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import { useNavigate } from "react-router-dom";
import './profile-view.scss';
import moment from "moment";

export const ProfileView = ({ user, setUser, addFav, removeFav }) => {
  const navigate = useNavigate();
  console.log("user profile", user);

  // Initialize state with user data
  const [username, setUsername] = useState(user.UserName || "");
  const [email, setEmail] = useState(user.Email || "");
  const [birthdate, setBirthdate] = useState(user.Birthday || "");
  const [password, setPassword] = useState(user.Password || "");

  useEffect(() => {
    setUsername(user.Username || "");
    setEmail(user.Email || "");
    setBirthdate(user.Birthday || "");
  }, [user]);

  // Format the birthdate for display
  const formattedBirthday = moment(user.Birthday).format('MMMM Do, YYYY');

  // Preparing formData with current state values
  const formData = {
    UserName: username,
    Email: email,
    Birthdate: birthdate,
    Password: password
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    // Adjusted to match the backend field names exactly.
    const updatedUserData = {
      Username: username, // Use 'Username' to match your mongoose schema
      Email: email,
      Birthday: birthdate, // Format the date as your backend expects, if necessary
      // No need to send Password if you're not updating it

    };

    fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.ok ? response.json() : Promise.reject('Update failed'))
      .then((data) => {
        alert("Update successful");
        localStorage.setItem("user", JSON.stringify(data)); // Update local storage
        setUser(data); // Update state to reflect the new user data
      })
      .catch((error) => {
        console.error("Failed to update user information:", error);
        alert("Failed to update user information");
      });
  };


  const handleUpdate = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break; // Added missing break statement
      case "password":
        setPassword(value);
        break;
      case "birthdate":
        setBirthdate(value);
        break;
      default:
        console.warn("Unknown form field:", name);
    }
  };


  const handleDeleteAccount = () => {
    const token = localStorage.getItem("token");
    fetch(`https://letflix-0d183cd4a94e.herokuapp.com/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("The account has been successfully deleted.");
        localStorage.clear();
        navigate('/signup');
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={6}> {/* Adjust this value to control the width of your card */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title><h2> Hello {user.username} </h2></Card.Title>
              <Card.Text>
                <strong>Username:</strong> {user.username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Birthday:</strong> {formattedBirthday}
              </Card.Text>
              <Button onClick={handleDeleteAccount} className="button-delete mt-3" type="button" variant="danger">
                Delete account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      
      
        <Col md={6}>
          <UpdateUser
            formData={formData}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
      <hr />
      <FavoriteMovies user={user} addFav={addFav} removeFav={removeFav} />
    </>
  );
};
