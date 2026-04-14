const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  item: String,
  productId: String,
  date: { type: Date, default: Date.now },
  amount: Number,
  status: { type: String, default: 'Paid' },
});

const customerSchema = new mongoose.Schema({
  customerId: { type: String },
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  status: { type: String, default: 'Active' },
  city: String,
  address: String,
  purchases: [purchaseSchema],
}, { timestamps: true });

// Auto-generate customerId
customerSchema.pre('save', async function () {
  if (!this.customerId) {
    const count = await mongoose.model('Customer').countDocuments();
    this.customerId = `CUS${String(count + 1).padStart(4, '0')}`;
  }
});

module.exports = mongoose.model('Customer', customerSchema);