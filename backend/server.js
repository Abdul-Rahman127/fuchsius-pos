const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Environment variables-ஐ load 
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // JSON 
app.use(cors()); // Frontend- requests-

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Routes
// Authentication (Login/Register) 
app.use('/api/auth', require('./routes/authRoutes'));

// Server  Test Route
app.get('/', (req, res) => {
  res.send('🚀 POS Backend Server is running...');
});

// Port settings
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});