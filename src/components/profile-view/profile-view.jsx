import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileView = ({ username }) => { // Assuming username is passed as a prop
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', dateOfBirth: '' });
  const [editMode, setEditMode] = useState(false);

  // Define headers with an Authorization token if needed
  const token = "yourAuthTokenHere"; // Ensure you replace this with your actual token logic
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    // Ensure you handle the case where username or token might be undefined or not yet available
    if (!username || !token) return;

    axios.get('https://letflix-0d183cd4a94e.herokuapp.com/users', { headers })
      .then(response => {
        // Assuming response.data is an array of user objects
        const foundUser = response.data.find(u => u.username === username);
        if (foundUser) setUser(foundUser);
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, [username]); // Removed headers from dependencies since it's not a state or prop

  // Example of a simple UI to display user information
  return (
    <div>
      <h1>User Profile</h1>
      {editMode ? (
        // Your form for editing user details would go here
        <div>Edit Mode is not yet implemented</div>
      ) : (
        <>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default ProfileView;
