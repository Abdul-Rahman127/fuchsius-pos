

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import purchaseRoutes from "./routes/purchaseRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/purchases", purchaseRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
const settingsRoutes = require('./routes/settings');
const customerRoutes = require('./routes/CustomerRoutes');

app.use('/api/settings',  settingsRoutes);
app.use('/api/customers', customerRoutes);

// Temp fix route
app.get('/fix-index', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    await mongoose.connection.db.collection('customers').dropIndex('customerId_1');
    res.json({ success: true, message: 'Index dropped!' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Fuchsius POS Backend running ✅' });
});

// ─── MongoDB + Server Start ───────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fuchsius_pos';
const PORT      = process.env.PORT      || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
  });


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
