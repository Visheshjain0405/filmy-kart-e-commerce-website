// AdminComponent.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const AdminComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('adminMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const replyToUser = (message) => {
    const reply = prompt('Enter your reply:');
    if (reply) {
      socket.emit('adminReply', { message: reply });
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg}
            <button onClick={() => replyToUser(msg)}>Reply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComponent;
