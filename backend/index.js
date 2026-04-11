const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
    family: 4 
})
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// --- 1. Settings Schema & Model ---
const SettingsSchema = new mongoose.Schema({
  storeName: { type: String, default: "My POS System" },
  currency: { type: String, default: "LKR" },
  darkMode: { type: Boolean, default: false }
});
const Settings = mongoose.model('Settings', SettingsSchema);

// --- 2. Product Schema & Model ---
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String, default: "" } //
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);


// --- Routes ---

// --- Settings Routes ---
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch settings.", message: err.message });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const { storeName, currency, darkMode } = req.body;
    let settings = await Settings.findOne();
    if (settings) {
      settings.storeName = storeName;
      settings.currency = currency;
      settings.darkMode = darkMode;
      await settings.save();
    } else {
      settings = new Settings({ storeName, currency, darkMode });
      await settings.save();
    }
    res.json({ message: "Settings updated successfully!", settings });
  } catch (err) {
    res.status(500).json({ error: "Unable to save settings.", message: err.message });
  }
});

// --- Product Routes ---


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch products.", message: err.message });
  }
});


app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch product.", message: err.message });
  }
});


app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: "Unable to save product.", message: err.message });
  }
});


app.post('/api/products/update-stock', async (req, res) => {
    const { items } = req.body;
    try {
        for (const item of items) {
            await Product.findByIdAndUpdate(item._id, {
                $inc: { stock: -item.qty } 
            });
        }
        res.json({ message: "Stock updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Unable to update stock.", message: err.message });
    }
});


app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Unable to delete product.", message: err.message });
  }
});


// --- Customer Routes ---
const customerRoutes = require('./routes/CustomerRoutes');
app.use('/api/customers', customerRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('POS System Backend is Live with Full Products Support!');
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});