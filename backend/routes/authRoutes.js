const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. User Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    
    const newUser = new User({
      name,
      email,
      password 
    });

    await newUser.save();
    res.status(201).json({ message: "✅ User Registered Successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Simple Login Route (Testing )
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.status(200).json({ message: "✅ Login Successful!", user });
    } else {
      res.status(401).json({ message: "❌ Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
