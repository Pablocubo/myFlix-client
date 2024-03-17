import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {
  
  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <br />
        <h2>Update profile information</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            minLength={5}
            name="username" // Ensure this matches the expected field in your handleSubmit
            value={formData.UserName}
            onChange={handleUpdate} // Simplified for readability
            required
          />
          <br />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email" // Ensure this matches the expected field in your handleSubmit
            value={formData.Email}
            onChange={handleUpdate} // Simplified for readability
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formPassword">
          <Form.Label>Password (optional):</Form.Label>
          <Form.Control
            type="password"
            minLength={8}
            name="password" // Optional field, ensure this is handled correctly in your handleSubmit
            value={formData.Password || ''} // Use || '' to avoid controlled input turning uncontrolled error
            onChange={handleUpdate}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            name="birthdate" // Ensure this matches the expected field in your handleSubmit
            value={formData.Birthdate}
            onChange={handleUpdate}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit changes
        </Button>
      </Form>
      <br />
    </Row>
  );
};
UpdateUser.propTypes = {
  formData: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UpdateUser;
