const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  storeName: { type: String, default: "My POS System" },
  currency: { type: String, default: "LKR" },
  darkMode: { type: Boolean, default: false }
});

module.exports = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);