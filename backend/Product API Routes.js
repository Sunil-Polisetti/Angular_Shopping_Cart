const express = require('express');
const Product = require('D:/project/angular-shopping-cart/backend/ProductSchema.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// <-- add this part -->
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

module.exports = router;