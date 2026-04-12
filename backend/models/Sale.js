const mongoose = require('mongoose');

const SaleItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const SaleSchema = new mongoose.Schema({
  items: [SaleItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Sale || mongoose.model('Sale', SaleSchema);
