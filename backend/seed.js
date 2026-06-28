const mongoose = require('mongoose');
const Product = require('./ProductSchema');

const sampleProducts = [
  // ================= MOBILE PHONES =================
  {
    name: 'iPhone 15 Pro Max',
    price: 139900,
    originalPrice: 159900,
    description: 'Flagship Apple smartphone with titanium design, A17 Pro chip, and advanced 5x Telephoto camera.',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80'],
    rating: 4.8,
    reviewCount: 2450,
    stock: 25,
    discount: 12,
    seller: 'Apple Store India'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 129999,
    originalPrice: 139999,
    description: 'Ultimate Android flagship with Galaxy AI, 200MP camera, Snapdragon 8 Gen 3, and integrated S Pen.',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80'],
    rating: 4.7,
    reviewCount: 1890,
    stock: 40,
    discount: 7,
    seller: 'Samsung India'
  },
  {
    name: 'OnePlus 12',
    price: 64999,
    originalPrice: 69999,
    description: 'Flagship killer with 4th Gen Hasselblad Camera for Mobile, 100W SUPERVOOC charging, and Snapdragon 8 Gen 3.',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80'],
    rating: 4.6,
    reviewCount: 1120,
    stock: 55,
    discount: 7,
    seller: 'OnePlus India'
  },
  {
    name: 'Nothing Phone 2',
    price: 37999,
    originalPrice: 44999,
    description: 'Unique transparent design with Glyph Interface, Nothing OS 2.0, and dual 50MP rear cameras.',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1691451152140-54ec83610986?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1691451152140-54ec83610986?auto=format&fit=crop&w=500&q=80'],
    rating: 4.5,
    reviewCount: 940,
    stock: 30,
    discount: 15,
    seller: 'Nothing Store'
  },
  {
    name: 'Redmi Note 13 Pro+',
    price: 31999,
    originalPrice: 33999,
    description: 'Super-midrange phone with 200MP camera, curved AMOLED display, and 120W HyperCharge.',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80'],
    rating: 4.4,
    reviewCount: 1540,
    stock: 80,
    discount: 6,
    seller: 'Xiaomi India'
  },
  {
    name: 'Motorola Edge 50 Pro',
    price: 29999,
    originalPrice: 35999,
    description: 'Stunning design with Pantone Validated display and camera, 125W charging, and clean Android.',
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80'],
    rating: 4.3,
    reviewCount: 780,
    stock: 45,
    discount: 16,
    seller: 'Motorola India'
  },

  // ================= LAPTOPS =================
  {
    name: 'MacBook Pro 16" M3 Max',
    price: 349900,
    originalPrice: 399900,
    description: 'The ultimate pro laptop. Featuring the M3 Max chip, a stunning Liquid Retina XDR display, and up to 22 hours of battery life.',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'],
    rating: 4.9,
    reviewCount: 380,
    stock: 15,
    discount: 12,
    seller: 'Apple Store India'
  },
  {
    name: 'Dell XPS 15',
    price: 219999,
    originalPrice: 249999,
    description: 'High-performance laptop with 13th Gen Intel Core i7, stunning 3.5K OLED touch display, and premium carbon fiber deck.',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80'],
    rating: 4.6,
    reviewCount: 520,
    stock: 20,
    discount: 12,
    seller: 'Dell India'
  },
  {
    name: 'ASUS ROG Zephyrus G14',
    price: 149990,
    originalPrice: 174990,
    description: 'Powerful and portable 14-inch gaming laptop with AMD Ryzen 9, RTX 4060, and ROG Nebula HDR Display.',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80'],
    rating: 4.7,
    reviewCount: 410,
    stock: 18,
    discount: 14,
    seller: 'ASUS ROG Store'
  },
  {
    name: 'Apple MacBook Air M2',
    price: 89900,
    originalPrice: 99900,
    description: 'Strikingly thin design, incredibly fast M2 chip, silent fanless system, and up to 18 hours of battery life.',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'],
    rating: 4.8,
    reviewCount: 2950,
    stock: 50,
    discount: 10,
    seller: 'Apple Store India'
  },
  {
    name: 'Lenovo Legion 5 Pro',
    price: 114999,
    originalPrice: 134999,
    description: 'Pro-grade gaming laptop with AMD Ryzen 7, RTX 4060, 16-inch QHD 165Hz display, and Legion Coldfront 4.0 cooling.',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&q=80'],
    rating: 4.6,
    reviewCount: 730,
    stock: 22,
    discount: 14,
    seller: 'Lenovo India'
  },

  // ================= AUDIO =================
  {
    name: 'Sony WH-1000XM5',
    price: 26990,
    originalPrice: 29990,
    description: 'Industry-leading noise canceling wireless over-ear headphones with auto NC optimizer and crystal clear hands-free calling.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80'],
    rating: 4.8,
    reviewCount: 3890,
    stock: 90,
    discount: 10,
    seller: 'Sony India'
  },
  {
    name: 'Apple AirPods Pro 2',
    price: 22900,
    originalPrice: 26900,
    description: 'Featuring 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1588449668365-d1b458b36870?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1588449668365-d1b458b36870?auto=format&fit=crop&w=500&q=80'],
    rating: 4.7,
    reviewCount: 4120,
    stock: 75,
    discount: 14,
    seller: 'Apple Store India'
  },
  {
    name: 'JBL Tune 760NC',
    price: 5999,
    originalPrice: 7999,
    description: 'Lightweight, foldable wireless over-ear headphones with active noise cancellation and pure bass sound.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80'],
    rating: 4.3,
    reviewCount: 2150,
    stock: 120,
    discount: 25,
    seller: 'JBL India Store'
  },
  {
    name: 'Marshall Emberton II',
    price: 14999,
    originalPrice: 17999,
    description: 'Compact portable Bluetooth speaker with loud and vibrant Marshall signature sound, offering 30+ hours of playtime.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80'],
    rating: 4.7,
    reviewCount: 890,
    stock: 45,
    discount: 16,
    seller: 'Marshall India'
  },

  // ================= SMART WEARABLES =================
  {
    name: 'Apple Watch Series 9',
    price: 37900,
    originalPrice: 41900,
    description: 'Smarter, brighter, and mightier. Featuring the S9 SiP, Double Tap gesture, and carbon neutral case options.',
    category: 'Smart Wearables',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80'],
    rating: 4.8,
    reviewCount: 1280,
    stock: 35,
    discount: 9,
    seller: 'Apple Store India'
  },
  {
    name: 'Samsung Galaxy Watch 6',
    price: 26999,
    originalPrice: 29999,
    description: 'Advanced sleep coaching, personalized heart rate zones, and a sleek bezel-less AMOLED display.',
    category: 'Smart Wearables',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80'],
    rating: 4.5,
    reviewCount: 920,
    stock: 50,
    discount: 10,
    seller: 'Samsung India'
  },

  // ================= GAMING & CAMERAS =================
  {
    name: 'Sony PlayStation 5 Slim',
    price: 44990,
    originalPrice: 54990,
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion, and all-new slim design.',
    category: 'Gaming & Cameras',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80'],
    rating: 4.8,
    reviewCount: 3120,
    stock: 40,
    discount: 18,
    seller: 'Sony Center'
  },
  {
    name: 'Nintendo Switch OLED',
    price: 28999,
    originalPrice: 32999,
    description: 'Features a vibrant 7-inch OLED screen, a wide adjustable stand, a wired LAN port, and 64GB of internal storage.',
    category: 'Gaming & Cameras',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=500&q=80'],
    rating: 4.7,
    reviewCount: 1450,
    stock: 25,
    discount: 12,
    seller: 'Gaming Hub'
  },
  {
    name: 'Sony Alpha 7 IV (Body)',
    price: 219990,
    originalPrice: 242990,
    description: 'Groundbreaking hybrid mirrorless camera with 33MP Exmor R CMOS sensor, advanced autofocus, and 4K 60p video recording.',
    category: 'Gaming & Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80'],
    rating: 4.9,
    reviewCount: 280,
    stock: 12,
    discount: 9,
    seller: 'Sony Alpha Store'
  },
  {
    name: 'Fujifilm Instax Mini 12',
    price: 5999,
    originalPrice: 6999,
    description: 'Cute, colorful, and compact instant camera. Features automatic exposure and selfie mirror.',
    category: 'Gaming & Cameras',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80'],
    rating: 4.4,
    reviewCount: 1940,
    stock: 100,
    discount: 14,
    seller: 'Fujifilm India'
  },

  // ================= CLOTHING =================
  {
    name: 'Premium Cotton T-Shirt',
    price: 499,
    originalPrice: 999,
    description: 'Made from 100% organic cotton. Pre-shrunk, breathable, and designed for everyday comfort.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80'],
    rating: 4.2,
    reviewCount: 5200,
    stock: 500,
    discount: 50,
    seller: 'Loom & Thread'
  },
  {
    name: 'Men Slim Fit Jeans',
    price: 1199,
    originalPrice: 2499,
    description: 'Classic 5-pocket denim jeans with a hint of stretch for active, all-day comfort.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80'],
    rating: 4.3,
    reviewCount: 3890,
    stock: 300,
    discount: 52,
    seller: 'Denim Co.'
  },
  {
    name: 'Casual Polo T-Shirt',
    price: 699,
    originalPrice: 1399,
    description: 'Timeless polo neck collar t-shirt with textured pique knit fabric and regular fit.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80'],
    rating: 4.1,
    reviewCount: 2650,
    stock: 250,
    discount: 50,
    seller: 'Classic Apparel'
  },

  // ================= BOOKS =================
  {
    name: 'Atomic Habits',
    price: 349,
    originalPrice: 599,
    description: 'The definitive guide by James Clear on breaking bad patterns and building good habits in small, manageable steps.',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80'],
    rating: 4.8,
    reviewCount: 12400,
    stock: 150,
    discount: 41,
    seller: 'Penguin Books'
  },
  {
    name: 'Rich Dad Poor Dad',
    price: 299,
    originalPrice: 499,
    description: 'Robert Kiyosaki\'s classic book on personal finance, wealth building, and the mindset of the rich.',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80'],
    rating: 4.7,
    reviewCount: 9800,
    stock: 180,
    discount: 40,
    seller: 'Warner Books'
  },
  {
    name: 'The Lean Startup',
    price: 399,
    originalPrice: 699,
    description: 'How modern entrepreneurs use continuous innovation to create radically successful businesses by Eric Ries.',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80'],
    rating: 4.6,
    reviewCount: 4560,
    stock: 110,
    discount: 42,
    seller: 'Crown Business'
  },

  // ================= HOME & KITCHEN =================
  {
    name: 'Instant Pot Duo 7-in-1',
    price: 7999,
    originalPrice: 11999,
    description: 'Smart electric multi-use pressure cooker. Functions as a slow cooker, rice cooker, steamer, and yogurt maker.',
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=500&q=80'],
    rating: 4.7,
    reviewCount: 2200,
    stock: 45,
    discount: 33,
    seller: 'Instant Brand'
  },
  {
    name: 'Philips Air Fryer XL',
    price: 9999,
    originalPrice: 14999,
    description: 'Fry, bake, grill, roast, and reheat with up to 90% less fat using Rapid Air technology.',
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=500&q=80'],
    rating: 4.6,
    reviewCount: 1540,
    stock: 35,
    discount: 33,
    seller: 'Philips India'
  },
  {
    name: 'Kent Grand Water Purifier',
    price: 16499,
    originalPrice: 19500,
    description: 'Wall-mountable RO + UV + UF water purifier with patented TDS controller and 8L storage.',
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1585837575652-267c0ee1229b?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1585837575652-267c0ee1229b?auto=format&fit=crop&w=500&q=80'],
    rating: 4.4,
    reviewCount: 1890,
    stock: 25,
    discount: 15,
    seller: 'Kent Store'
  },

  // ================= FITNESS =================
  {
    name: 'Flexibell Adjustable Dumbbells',
    price: 14999,
    originalPrice: 18999,
    description: 'All-in-one adjustable dumbbells with smooth dial system, adjusting from 2.5kg to 24kg per dumbbell.',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=500&q=80'],
    rating: 4.8,
    reviewCount: 430,
    stock: 30,
    discount: 21,
    seller: 'FitGear Store'
  },
  {
    name: 'Lifelong FitPro Treadmill',
    price: 15999,
    originalPrice: 24999,
    description: 'Foldable motorized treadmill with 2.5 HP motor, 12 preset workouts, and heart rate sensor.',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80'],
    rating: 4.5,
    reviewCount: 1120,
    stock: 15,
    discount: 36,
    seller: 'Lifelong Fitness'
  },
  {
    name: 'Decathlon Yoga Mat',
    price: 799,
    originalPrice: 1199,
    description: 'Extra thick 8mm non-slip cushioning mat, perfect for yoga, pilates, and floor exercises.',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80'],
    rating: 4.3,
    reviewCount: 1840,
    stock: 200,
    discount: 33,
    seller: 'Decathlon Store'
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

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seedProducts();
