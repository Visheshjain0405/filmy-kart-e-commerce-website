// const express = require('express');
// const router = express.Router();
// const User = require('../Models/userModel'); 
// const bcrypt = require('bcrypt');

// router.post('/reset-password', async (req, res) => {
//     const { token, newPassword } = req.body;
  
//     try {
//       const user = await User.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() }
//       });
  
//       if (!user) {
//         return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
//       }
  
//       // Set new password
//       user.password = newPassword;
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpires = undefined;
//       await user.save();
  
//       res.status(200).json({ message: 'Password reset successful' });
//     } catch (error) {
//       console.error('Reset password error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  