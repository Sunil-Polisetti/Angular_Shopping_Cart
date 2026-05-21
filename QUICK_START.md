# 🚀 Quick Start Guide - Angular Shopping Cart

## ⚡ Get Started in 3 Steps

### Step 1: Seed Database (30+ Products)
```bash
cd backend
node seed.js
```

Expected Output:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✨ 30 products inserted successfully!
```

### Step 2: Start Backend Server
```bash
cd backend
node server.js
```

Expected Output:
```
Server running on port 3000
MongoDB connected
```

### Step 3: Start Frontend
```bash
# In a new terminal, from project root
npm start
```

Expected Output:
```
Angular Live Development Server is listening on localhost:4200
√ Compiled successfully.
```

### 🌐 Open Application
```
http://localhost:4200
```

---

## 📋 Test the Features

### 1️⃣ Browse & Search
- View 30+ products across 6 categories
- Use search box to find products
- Filter by category (Mobile, Laptop, Audio, etc.)
- Sort by price, rating, discount

### 2️⃣ Add to Cart
- Click "Add to Cart" button on any product
- See cart count update on navbar (top right)
- Continue shopping or view cart

### 3️⃣ Register & Login
- Click "Register" → Create new account
- Use any email and password
- After registration, login with credentials
- See your profile in navbar dropdown

### 4️⃣ Manage Cart
- Go to Cart page (🛒 icon in navbar)
- View items with prices and discounts
- Remove unwanted items
- See automatic GST (18%) calculation
- Notice free delivery

### 5️⃣ Checkout
- Click "Proceed to Checkout" button
- Fill in delivery address
- Select payment method (any option works for demo)
- Review order summary
- Click "Place Order"
- See success confirmation with Order Number

### 6️⃣ User Profile
- Click on your name in navbar (top right)
- See dropdown menu with:
  - Your name and email
  - My Cart (shows item count)
  - My Orders
  - Wishlist
  - Account Settings
  - Logout button

---

## 🎯 Key Features

### Products
- 30+ items with authentic Indian prices (₹)
- Categories: Mobile, Laptop, Audio, Clothing, Kitchen, Books
- Real discounts (6-50%)
- Ratings & reviews
- Stock information
- Detailed specifications

### Cart
- Dynamic updates (real-time)
- Individual item removal
- Subtotal calculation
- Discount breakdown
- 18% GST calculation
- Free delivery
- Cart badge on navbar

### Checkout
- Complete delivery form
- Multiple payment options
- Order summary
- Automatic price calculations
- Order confirmation
- Cart auto-clear after order

### User Account
- Registration & Login
- Profile dropdown in navbar
- User details display
- Quick access to orders/wishlist
- Logout functionality

---

## 🧪 Test Credentials

### Create Your Own Account
1. Click "Register" button
2. Enter any name, email, password
3. Click "Register"
4. Login with created credentials

### Example Test Credentials
```
Email: test@example.com
Password: Test@123
Name: Test User
```

---

## 📱 Responsive Design

The application works perfectly on:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px-1199px)
- ✅ Mobile (Below 768px)
- ✅ Small Mobile (Below 480px)

Try resizing browser window or viewing on mobile device!

---

## 🎨 Default Test Product to Add

```
iPhone 15 Pro Max - ₹1,49,999 (-6%)
Samsung Galaxy S24 Ultra - ₹1,29,999 (-7%)
OnePlus 12 - ₹64,999 (-7%)
```

Add these to cart and proceed through checkout!

---

## ⚙️ API Endpoints (Backend)

### Products
```
GET  /api/products              - All products
GET  /api/products/:id          - Single product
POST /api/products              - Create product
PUT  /api/products/:id          - Update product
DELETE /api/products/:id        - Delete product
```

### Authentication
```
POST /api/auth/register         - Register user
POST /api/auth/login            - Login user
```

---

## 🔍 Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check: `mongod` should be running in terminal
- Default connection: `mongodb://127.0.0.1:27017/shoppingcart`

### "Port 3000 already in use"
```bash
# Find process on port 3000
netstat -ano | findstr :3000
# Kill it (replace PID with actual number)
taskkill /PID <PID> /F
```

### "Port 4200 already in use"
```bash
# Kill Angular dev server
ng serve --port 4201
```

### "Compilation errors"
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm start
```

### "Cart not showing items"
- Make sure you added items before going to cart page
- Check browser console for errors (F12)
- Try refreshing the page

---

## 📊 Sample Orders to Try

1. **Mobile Order**
   - Add iPhone 15 Pro Max
   - Checkout with delivery address
   - Notice ₹1,49,999 price with GST

2. **Electronics Order**
   - Add MacBook Pro, Sony Headphones
   - See combined total with GST
   - Multiple item discount calculation

3. **Budget Order**
   - Add T-Shirt, Jeans, Book
   - See lower price items
   - Still 18% GST applies

---

## 🎉 You're All Set!

Your complete Flipkart/Amazon-style e-commerce application is ready!

Features working:
- ✅ 30+ Products
- ✅ User Login/Register
- ✅ User Account Display
- ✅ Dynamic Shopping Cart
- ✅ Real-time Updates
- ✅ Professional Checkout
- ✅ GST Calculations
- ✅ Responsive Design

**Happy Shopping! 🛍️**

---

For detailed features, see: [ENHANCED_FEATURES.md](ENHANCED_FEATURES.md)
