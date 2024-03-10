import React from 'react';

function UserInfo({ email, name, birthday }) {
  return (
    <>
    <h4>Your Info</h4>
      <p>User: {name || 'Loading...'}</p>
      <p>Email: {email || 'Loading...'}</p>
      <p>Birthday: {birthday || 'Loading...'}</p>
    </>
  );
}

export default UserInfo;