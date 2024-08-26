// UserComponent.jsx
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const UserComponent = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit('userMessage', { message });
    setMessage('');
  };

  return (
    <div>
      <h1>User Page</h1>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default UserComponent;
