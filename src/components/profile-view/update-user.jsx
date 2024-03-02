import React from 'react'; // Eliminada la importación innecesaria de { Component }
import { Form, Button } from 'react-bootstrap';


function UpdateUser({ user, handleSubmit, handleUpdate }) { // Asumiendo que user, handleSubmit, y handleUpdate son pasados como props
  return (
    <>
      <h4>Update Info</h4>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='Username'
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='New password'
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='New password'
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}
             />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            defaultValue={user.Email}
            onChange={e => handleUpdate(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'
            onClick={handleSubmit}>
            Submit
          </Button>
         
      </Form>
    </>
  );
}

export default UpdateUser // Corregido el nombre de exportación
