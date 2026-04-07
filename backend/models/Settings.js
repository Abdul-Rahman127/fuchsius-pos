const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  storeName: String,
  currency: String,
  taxRate: String,
  lowStockAlert: Boolean,
  dailyReport: Boolean,
  offlineMode: Boolean
});

module.exports = mongoose.model('Settings', SettingsSchema);