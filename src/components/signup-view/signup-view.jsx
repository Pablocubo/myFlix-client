import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For React Router v6
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";


export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate(); // For navigation

   // Mark handleSubmit as async
   const handleSubmit = async (event) => {
    event.preventDefault();


  const data = {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday,
  };

  try {
    const response = await fetch('https://letflix-0d183cd4a94e.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Signup successful');
      navigate('/'); // Adjust the route as per your routing setup
    } else {
      const responseBody = await response.json();
      alert(`Signup failed: ${responseBody.message}`);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('Signup failed');
  }
};


  return (
    <Container style={{ marginTop: '180px' }}>
      <Row className="justify-content-center">
          <Col md={6}>
        <CardGroup>
          <Card.Body>
            <Card.Title style={{ marginBottom: "20px"}}>¿First time on Letflix? Subscribe now.</Card.Title>
        <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter a username"
          minLength="3"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your password must be 8 or more characters"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your e-mail"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          defaultValue={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ marginTop: '10px', marginBottom: '10px' }}>Sign up</Button>
    </Form>
</Card.Body>
        </CardGroup>
       </Col>
      </Row>
    </Container>
    );
  };