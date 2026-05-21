const mongoose = require('mongoose');
const Product = require('./ProductSchema');

const sampleProducts = [
  // ================= MOBILE PHONES =================
  {
    name: 'iPhone 15 Pro Max',
    price: 149999,
    originalPrice: 159999,
    description: 'Latest Apple smartphone with advanced camera system and A17 Pro chip',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.5,
    reviewCount: 1250,
    stock: 45,
    discount: 6,
    seller: 'Apple India'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 129999,
    originalPrice: 139999,
    description: 'Flagship Samsung smartphone with 200MP camera and Galaxy AI features',
    category: 'Mobile Phones',
    image: 'https://m.media-amazon.com/images/I/61+g6KrDXdL._SX679_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/61+g6KrDXdL._SX679_.jpg'
    ],
    rating: 4.4,
    reviewCount: 980,
    stock: 60,
    discount: 7,
    seller: 'Samsung India'
  },
  {
    name: 'OnePlus 12',
    price: 64999,
    originalPrice: 69999,
    description: 'Fast and smooth performance with Snapdragon 8 Gen 3',
    category: 'Mobile Phones',
    image: 'https://m.media-amazon.com/images/I/71YzJwmRFCL._SX522_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/71YzJwmRFCL._SX522_.jpg'
    ],
    rating: 4.3,
    reviewCount: 750,
    stock: 75,
    discount: 7,
    seller: 'OnePlus India'
  },
  {
    name: 'Xiaomi 14 Ultra',
    price: 49999,
    originalPrice: 59999,
    description: 'Premium Xiaomi phone with excellent camera system',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.2,
    reviewCount: 620,
    stock: 80,
    discount: 17,
    seller: 'Xiaomi India'
  },
  {
  name: 'iQOO 12',
  price: 52999,
  originalPrice: 59999,
  description: 'High-performance gaming smartphone with Snapdragon chipset',
  category: 'Mobile Phones',
  image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80',
  images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80'],
  rating: 4.4,
  reviewCount: 1400,
  stock: 65,
  discount: 12,
  seller: 'iQOO India'
},
{
  name: 'Nothing Phone 2',
  price: 44999,
  originalPrice: 49999,
  description: 'Unique glyph interface with clean Android experience',
  category: 'Mobile Phones',
  image: 'https://m.media-amazon.com/images/I/61NoWFI1VHL._AC_UL480_FMwebp_QL65_.jpg',
  images: ['https://m.media-amazon.com/images/I/61NoWFI1VHL._AC_UL480_FMwebp_QL65_.jpg'],
  rating: 4.3,
  reviewCount: 1800,
  stock: 70,
  discount: 10,
  seller: 'Nothing India'
},
{
  name: 'Redmi Note 13 Pro+',
  price: 31999,
  originalPrice: 36999,
  description: 'Popular Redmi smartphone with curved AMOLED display',
  category: 'Mobile Phones',
  image: 'https://m.media-amazon.com/images/I/71XQD0wtMPL._AC_UY327_FMwebp_QL65_.jpg',
  images: ['https://m.media-amazon.com/images/I/71XQD0wtMPL._AC_UY327_FMwebp_QL65_.jpg'],
  rating: 4.3,
  reviewCount: 3200,
  stock: 90,
  discount: 14,
  seller: 'Xiaomi India'
},
{
  name: 'Motorola G84',
  price: 19999,
  originalPrice: 24999,
  description: 'Affordable clean Android smartphone',
  category: 'Mobile Phones',
  image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80',
  images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80'],
  rating: 4.1,
  reviewCount: 2600,
  stock: 120,
  discount: 20,
  seller: 'Motorola India'
},

  // ================= LAPTOPS =================
  {
    name: 'MacBook Pro 16" M3 Max',
    price: 249999,
    originalPrice: 269999,
    description: 'Professional laptop with M3 Max chip',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.8,
    reviewCount: 450,
    stock: 25,
    discount: 7,
    seller: 'Apple India'
  },
  {
    name: 'Dell XPS 15',
    price: 149999,
    originalPrice: 169999,
    description: 'Premium Windows laptop with 4K display',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.6,
    reviewCount: 320,
    stock: 30,
    discount: 12,
    seller: 'Dell India'
  },
  {
  name: 'HP Victus Gaming',
  price: 89999,
  originalPrice: 109999,
  description: 'Gaming laptop with RTX graphics',
  category: 'Laptops',
  image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
  images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80'],
  rating: 4.4,
  reviewCount: 650,
  stock: 40,
  discount: 18,
  seller: 'HP India'
},
{
  name: 'Apple MacBook Air M2',
  price: 114999,
  originalPrice: 124999,
  description: 'Lightweight premium Apple laptop',
  category: 'Laptops',
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
  images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'],
  rating: 4.8,
  reviewCount: 1300,
  stock: 45,
  discount: 8,
  seller: 'Apple India'
},
{
  name: 'Lenovo Legion 5',
  price: 109999,
  originalPrice: 129999,
  description: 'High-performance gaming laptop',
  category: 'Laptops',
  image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&q=80',
  images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&q=80'],
  rating: 4.6,
  reviewCount: 910,
  stock: 28,
  discount: 15,
  seller: 'Lenovo India'
},


  // ================= AUDIO =================
  {
    name: 'Sony WH-1000XM5',
    price: 28990,
    originalPrice: 30990,
    description: 'Premium wireless headphones with ANC',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.7,
    reviewCount: 2100,
    stock: 85,
    discount: 6,
    seller: 'Sony India'
  },
  {
    name: 'Apple AirPods Pro 2',
    price: 24900,
    originalPrice: 29900,
    description: 'Premium Apple AirPods with ANC',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.6,
    reviewCount: 1200,
    stock: 70,
    discount: 17,
    seller: 'Apple India'
  },
  {
  name: 'JBL Tune 760NC',
  price: 7999,
  originalPrice: 10999,
  description: 'Wireless headphones with noise cancellation',
  category: 'Audio',
  image: 'https://m.media-amazon.com/images/I/61JU2HicMQL._AC_UY327_FMwebp_QL65_.jpg',
  images: ['https://m.media-amazon.com/images/I/61JU2HicMQL._AC_UY327_FMwebp_QL65_.jpg'],
  rating: 4.3,
  reviewCount: 2600,
  stock: 110,
  discount: 27,
  seller: 'JBL India'
},
{
  name: 'Boat Stone 1200',
  price: 3999,
  originalPrice: 6999,
  description: 'Portable Bluetooth speaker with deep bass',
  category: 'Audio',
  image: 'https://m.media-amazon.com/images/I/815DcFJ76VL._AC_UY327_FMwebp_QL65_.jpg',
  images: ['https://m.media-amazon.com/images/I/815DcFJ76VL._AC_UY327_FMwebp_QL65_.jpg'],
  rating: 4.2,
  reviewCount: 3400,
  stock: 150,
  discount: 43,
  seller: 'Boat India'
},


  // ================= CLOTHING =================
  {
    name: 'Premium Cotton T-Shirt',
    price: 599,
    originalPrice: 999,
    description: '100% organic cotton t-shirt',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.2,
    reviewCount: 4500,
    stock: 200,
    discount: 40,
    seller: 'Fashion Hub'
  },
  {
  name: 'Men Slim Fit Jeans',
  price: 1299,
  originalPrice: 2499,
  description: 'Comfortable slim fit denim jeans',
  category: 'Clothing',
  image: 'https://m.media-amazon.com/images/I/510LeIBtvqL._AC_UL480_FMwebp_QL65_.jpg',
  images: ['https://m.media-amazon.com/images/I/510LeIBtvqL._AC_UL480_FMwebp_QL65_.jpg'],
  rating: 4.3,
  reviewCount: 3200,
  stock: 180,
  discount: 48,
  seller: 'Denim Pro'
},
{
  name: 'Casual Polo T-Shirt',
  price: 799,
  originalPrice: 1599,
  description: 'Classic polo t-shirt for everyday wear',
  category: 'Clothing',
  image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80',
  images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80'],
  rating: 4.1,
  reviewCount: 2100,
  stock: 190,
  discount: 50,
  seller: 'Style World'
},


  // ================= BOOKS =================
  {
    name: 'Atomic Habits',
    price: 399,
    originalPrice: 599,
    description: 'Best-selling book on habits',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.8,
    reviewCount: 5600,
    stock: 120,
    discount: 33,
    seller: 'Book Store'
  },
  {
  name: 'Rich Dad Poor Dad',
  price: 349,
  originalPrice: 599,
  description: 'Financial education classic',
  category: 'Books',
  image: 'https://m.media-amazon.com/images/I/71HJj3XmheL._AC_UY327_FMwebp_QL65_.jpg',
  images: ['https://m.media-amazon.com/images/I/71HJj3XmheL._AC_UY327_FMwebp_QL65_.jpg'],
  rating: 4.7,
  reviewCount: 4200,
  stock: 140,
  discount: 42,
  seller: 'Book Store'
},
{
  name: 'The Lean Startup',
  price: 329,
  originalPrice: 599,
  description: 'Guide to building successful startups',
  category: 'Books',
  image: 'https://m.media-amazon.com/images/I/614XDBst7RL._AC_UY327_FMwebp_QL65_.jpg',
  images: ['https://m.media-amazon.com/images/I/614XDBst7RL._AC_UY327_FMwebp_QL65_.jpg'],
  rating: 4.6,
  reviewCount: 3100,
  stock: 130,
  discount: 45,
  seller: 'Book Store'
}

];

async function seedProducts() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingcart');
    console.log('✅ MongoDB Connected');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`${insertedProducts.length} products inserted successfully!`);

    console.log('\nSample products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seedProducts();
