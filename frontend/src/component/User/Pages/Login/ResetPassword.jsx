// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = window.location.pathname.split('/').pop(); // Extract token from URL

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword }); // Send token along with new password
      setMessage(response.data.message);
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
