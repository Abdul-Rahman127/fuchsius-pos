const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 


router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. අලුත් Product එකක් ඇතුළත් කිරීම (POST)
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        sku: req.body.sku,
        category: req.body.category,
        price: req.body.price,
        cost: req.body.cost,
        stock: req.body.stock
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;