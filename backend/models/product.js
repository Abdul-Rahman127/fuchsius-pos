const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);