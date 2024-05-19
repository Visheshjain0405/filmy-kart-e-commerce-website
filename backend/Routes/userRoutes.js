const express = require('express');
const router = express.Router();
const User = require('../Models/userModel'); 
const bcrypt = require('bcrypt'); // Import bcrypt module
const jwt = require('jsonwebtoken');

router.post('/api/signup', async (req, res) => {
    try {
  
      const existingUser = await User.findOne({ userEmail: req.body.userEmail });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
  
      // Create a new user
      const newUser = new User({
        userFullName: req.body.userFullName,
        userEmail: req.body.userEmail,
        userPassword: hashedPassword
      });
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/api/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ userEmail });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Check password
      const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT token
      jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to generate token' });
        }
        res.status(200).json({ user, auth: token });
      });
  
      // Login successful
      // res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/user', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      console.log(user)
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      // Return user details
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error retrieving user details:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ success: false, message: 'No token provided' });
    }
    jwt.verify(token.split(' ')[1], '123adc456def', (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
      }
      req.userId = decoded.userId;
      next();
    });
  }

  

module.exports = router;
