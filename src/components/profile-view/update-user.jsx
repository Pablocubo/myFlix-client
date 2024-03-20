import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {

  return (
    <Row className="justify-content-md-center">
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Card.Title><h2>Update profile information</h2></Card.Title>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                minLength={5}
                name="username"
                value={formData.UserName}
                onChange={handleUpdate}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.Email}
                onChange={handleUpdate}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password (optional):</Form.Label>
              <Form.Control
                type="password"
                minLength={8}
                name="password"
                value={formData.Password || ''}
                onChange={handleUpdate}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                name="birthdate"
                value={formData.Birthdate}
                onChange={handleUpdate}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
};

UpdateUser.propTypes = {
  formData: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UpdateUser;
