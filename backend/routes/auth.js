const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // For MVP testing, automatically create user if no users exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const newUser = new User({
        name: 'Admin User',
        email: email,
        password: password, // Note: storing plain text just for MVP
        role: role || 'admin'
      });
      await newUser.save();
      return res.json({ message: 'User created and logged in', user: newUser });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Usually you return a JWT, but for simplicity here we return user
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', message: err.message });
  }
});

module.exports = router;
