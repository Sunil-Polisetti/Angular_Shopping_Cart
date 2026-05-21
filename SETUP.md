# 🚀 Angular Shopping Cart - Setup & Deployment Guide

## Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (Local installation or Cloud MongoDB Atlas)
- **Angular CLI** (optional but recommended)

### Verify Installations
```bash
node --version      # Should show v14+
npm --version       # Should show 6+
ng version          # Angular CLI version
mongod --version    # MongoDB version
```

---

## 🔧 Local Development Setup

### Step 1: Clone/Navigate to Project
```bash
cd d:\project\angular-shopping-cart
```

### Step 2: Install Backend Dependencies

**Terminal 1 - Backend**
```bash
cd backend
npm install

# Expected output:
# added 13 packages, audited 113 packages in 5s
```

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service (Windows)
mongod

# Or use MongoDB Compass (GUI)
# Download from: https://www.mongodb.com/products/compass
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update in `backend/server.js`:
```javascript
mongoose.connect('your-atlas-connection-string')
```

### Step 4: Start Backend Server

**Terminal 1**
```bash
cd backend
npm start

# Expected output:
# Server running on port 3000
# MongoDB connected
```

### Step 5: Install Frontend Dependencies

**Terminal 2 - Frontend**
```bash
npm install

# Expected output:
# added X packages in Ys
```

### Step 6: Start Frontend Server

**Terminal 2**
```bash
ng serve

# OR (with auto-open browser)
ng serve --open

# Expected output:
# ✔ Compiled successfully.
# ✔ Angular Live Development Server listening on localhost:4200
```

### Step 7: Open Application
```
Browser URL: http://localhost:4200
```

---

## 🗄️ Database Setup

### Auto-Seeding on First Run

The backend automatically seeds 30+ products on first run:

1. Backend starts and connects to MongoDB
2. Checks if products collection exists
3. If not, runs `seed.js` to populate products
4. Products include: name, price, discount, category, image URL

### Manual Database Setup (Optional)

```bash
# Connect to MongoDB
mongo

# Switch to database
use shoppingcart

# Check seeded products
db.products.find().limit(5)

# Expected: 30+ products with pricing
```

---

## 🧪 Testing the Application

### Test User Registration
1. Navigate to `http://localhost:4200/register`
2. Enter email and password
3. Click Register
4. Success message appears
5. Auto-redirects to login

### Test User Login
1. Navigate to `http://localhost:4200/login`
2. Enter registered email and password
3. Click Login
4. Redirects to product list
5. User name appears in navbar

### Test Shopping Cart
1. Browse products on home page
2. Click "Add to Cart" on any product
3. Cart count updates in navbar
4. Click cart icon to view items
5. Items persist on page refresh

### Test Checkout
1. Click "Proceed to Checkout" in cart
2. Form loads with address fields
3. Select payment method (e.g., Credit Card)
4. Fill in delivery address
5. Click "Place Order"
6. Processing overlay appears

### Test Online Payment (Razorpay)
1. In checkout, select "Credit Card"
2. Fill form and place order
3. Razorpay modal opens
4. Use test card: **4111111111111111**
5. Expiry: **12/25**, CVV: **123**
6. OTP: Any 6 digits
7. Payment completes
8. Order confirmation page displays

### Test COD Payment
1. In checkout, select "Cash on Delivery"
2. Fill form and place order
3. 1.5 second processing
4. Order confirmation page displays
5. Status shows as "Pending"

### Test Order Tracking
1. Click "My Orders" in user dropdown
2. View all past orders
3. Click order to see details
4. View status timeline
5. Download invoice as HTML
6. Test cancellation (if pending/confirmed)

---

## ⚙️ Environment Configuration

### Create .env File (Optional)

**backend/.env**
```env
# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/shoppingcart

# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shoppingcart

# Razorpay (Test Mode)
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=i7XWvEjIrZkyAmutHmPaSpih

# JWT Secret
JWT_SECRET=your_very_secret_jwt_key_here

# Email (Optional for future)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Update server.js to Use .env
```javascript
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shoppingcart')
```

---

## 🔑 Test Credentials

### Razorpay (Test Mode)
```
Key ID:     rzp_test_1DP5mmOlF5G5ag
Key Secret: i7XWvEjIrZkyAmutHmPaSpih
```

### Test Payment Cards
```
Success Card:  4111111111111111
Failed Card:   4000000000000002
Expiry:        12/25 (any future month/year)
CVV:           123 (any 3 digits)
OTP:           123456 (any 6 digits)
```

### Test User Account
```
Email:    demo@example.com
Password: demo123
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'razorpay'"

**Solution:** Install dependencies again
```bash
cd backend
npm install razorpay
```

### Issue: "MongoDB connection error"

**Causes:**
- MongoDB not running
- Connection string incorrect
- Port 27017 already in use

**Solutions:**
```bash
# Start MongoDB
mongod

# OR check if running on different port
netstat -ano | findstr :27017

# OR use MongoDB Atlas (cloud)
```

### Issue: "Cart is empty" on checkout

**Cause:** CartService needs localStorage integration

**Solution:** Already fixed! CartService now persists to localStorage automatically.

**Manual check:**
```javascript
// In browser console:
localStorage.getItem('shoppingCart')
```

### Issue: "Cannot GET /checkout"

**Cause:** Route not configured or cache issue

**Solution:**
```bash
# Clear Angular cache
rm -rf .angular
ng cache clean

# Rebuild
ng serve
```

### Issue: "Payment modal not opening"

**Cause:** Razorpay script not loaded or CORS issue

**Solution:**
1. Check browser console for errors
2. Verify backend is running
3. Check Razorpay credentials
4. Try different payment method

### Issue: "Order not saved"

**Cause:** MongoDB not connected or order creation failed

**Solution:**
```bash
# Check MongoDB is running
# Check backend logs for errors
# Verify order data is valid

# In MongoDB console:
db.orders.find().pretty()
```

---

## 📊 Monitoring & Logs

### Backend Logs
Watch for these messages:
```
Server running on port 3000       ✓ Good
MongoDB connected                  ✓ Good
Order created: ORD-123456         ✓ Good
Payment verified successfully      ✓ Good
```

### Frontend Logs
Open browser DevTools (F12) and check Console:
```
[HttpClient] GET /api/products    ✓ Good
Payment verified                   ✓ Good
Order confirmation loaded          ✓ Good
```

### Database Monitoring

**MongoDB Compass:**
1. Connect to `mongodb://127.0.0.1:27017`
2. Browse collections:
   - `users` - Registered users
   - `products` - 30+ products
   - `orders` - Orders placed
3. View document details

---

## 🚀 Production Deployment

### Before Deploying

1. **Test thoroughly:**
   - Register/login
   - Browse products
   - Complete checkout
   - Test payment
   - Check orders

2. **Update credentials:**
   - Change Razorpay to LIVE credentials
   - Update JWT secret
   - Update MongoDB to production instance

3. **Optimize code:**
```bash
# Angular production build
ng build --configuration production

# Check bundle size
ng build --stats-json
```

### Deploy Frontend

**Option 1: Netlify**
```bash
npm install -g netlify-cli
ng build --prod
netlify deploy --prod --dir=dist/angular-shopping-cart
```

**Option 2: Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option 3: GitHub Pages**
```bash
ng build --prod --base-href="/angular-shopping-cart/"
angular-cli-ghpages
```

### Deploy Backend

**Option 1: Heroku**
```bash
heroku create your-app-name
git push heroku main
```

**Option 2: Railway.app**
- Connect GitHub repo
- Auto-deploys on push
- Set environment variables

**Option 3: DigitalOcean**
- Create droplet
- Install Node.js, MongoDB
- Clone repo, run npm install
- Use PM2 for process management

---

## 🔐 Security Checklist

Before production:

- [ ] Change Razorpay to LIVE credentials
- [ ] Update JWT_SECRET to strong value
- [ ] Enable HTTPS only
- [ ] Set secure cookies
- [ ] Update CORS origins
- [ ] Add rate limiting
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for secrets
- [ ] Add input validation on backend
- [ ] Implement CSRF protection
- [ ] Set security headers (helmet.js)
- [ ] Add request logging
- [ ] Setup error monitoring (Sentry)
- [ ] Regular security audits

---

## 📚 Useful Commands

### Frontend
```bash
ng serve              # Start dev server
ng build              # Build for production
ng test               # Run tests
ng lint               # Check code quality
ng generate component # Generate component
ng generate service   # Generate service
```

### Backend
```bash
npm start             # Start server
npm test              # Run tests
npm install package   # Install package
npm audit             # Check vulnerabilities
```

### MongoDB
```bash
mongod                # Start MongoDB
mongo                 # Connect to MongoDB
use shoppingcart      # Switch database
db.collection.find()  # Query collection
```

---

## 📞 Support & Resources

### Documentation
- [Angular Docs](https://angular.io/docs)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Razorpay Docs](https://razorpay.com/docs/)

### Project Files
- `README.md` - Quick start guide
- `PROJECT_STRUCTURE.md` - Architecture overview
- `FEATURES.md` - Feature documentation
- `SETUP.md` - This file

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend running on port 3000
- [ ] Frontend running on port 4200
- [ ] MongoDB connected
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can add products to cart
- [ ] Cart persists on refresh
- [ ] Can proceed to checkout
- [ ] Can place order with COD
- [ ] Can place order with test Razorpay card
- [ ] Order confirmation page shows
- [ ] Can view order in tracking
- [ ] Can download invoice
- [ ] Can cancel order
- [ ] No console errors

---

**Last Updated:** January 26, 2026
**Version:** 1.0.0
**Status:** ✅ Ready for Production
