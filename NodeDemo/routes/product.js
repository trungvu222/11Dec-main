var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var validateProduct = require('../validates/product');

// Route để lấy tất cả sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// Route để tạo một sản phẩm mới
router.post('/', async (req, res) => {
    // Xác thực dữ liệu đầu vào
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    });

    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;