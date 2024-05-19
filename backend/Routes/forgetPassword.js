// const express = require('express');
// const router = express.Router();
// const crypto = require('crypto');
// const User = require('../Models/userModel');
// const nodemailer = require('nodemailer');

// router.post('/api/forgot-password', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Generate reset token
//         const token = crypto.randomBytes(20).toString('hex');

//         // Set token expiry time (in milliseconds)
//         const tokenExpiry = Date.now() + 3600000; // 1 hour

//         // Update user with reset token and expiry time
//         await User.findByIdAndUpdate(user._id, {
//             resetPasswordToken: token,
//             resetPasswordExpires: tokenExpiry
//         });

//         // Send reset password email
//         const transporter = nodemailer.createTransport({
//             // Configure your email service
//             service: 'gmail',
//             auth: {
//                 user: 'Visheshj865@gmail.com', // Your Gmail email address
//                 pass: 'ssra lqbg tanz iklq', // Your Gmail password
//             },
//             debug: true,
//         });

//         const mailOptions = {
//             from: 'Visheshj865@gmail.com',
//             to: email,
//             subject: 'Password Reset Request',
//             text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
//                 `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
//                 `http://${req.headers.host}/reset/${token}\n\n` +
//                 `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Email sent with password reset instructions' });
//     } catch (error) {
//         console.error('Forgot password error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = router;
