const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    originalPrice: Number,
    description: String,
    category: String,
    image: String,
    images: [String],
    rating: Number,
    reviewCount: Number,
    stock: Number,
    discount: Number,
    seller: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
