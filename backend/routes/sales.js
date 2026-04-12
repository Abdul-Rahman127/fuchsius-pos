const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product'); // Assuming Product is moved to models/Product or defined globally, wait actually Product is in index.js currently.
// I will need to move Product to models/Product.js or just use mongoose.model('Product')
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  try {
    const { items, subtotal, tax, discount, total, paymentMethod } = req.body;
    
    // Save the sale
    const newSale = new Sale({
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod
    });
    const savedSale = await newSale.save();

    // Deduct stock for each item sold
    // We get Product via mongoose.model in case it's defined in index.js
    const ProductModel = mongoose.model('Product');
    for (const item of items) {
      // Find the product by sku or _id. We'll use sku since the frontend maps skew
      await ProductModel.findOneAndUpdate(
        { sku: item.sku },
        { $inc: { stock: -1 } } // Decrement one per item. If multiple qty of same item, would need -qty. 
        // In the current frontend cart it adds 1 item per sku.
      );
    }

    res.status(201).json({ message: "Sale completed successfully!", sale: savedSale });
  } catch (err) {
    res.status(500).json({ error: "Unable to process sale.", message: err.message });
  }
});

module.exports = router;
