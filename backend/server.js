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