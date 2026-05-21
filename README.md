# 🛒 Angular Shopping Cart - Full E-commerce Application

A production-ready Angular 13 single-page e-commerce application with complete payment gateway integration (Razorpay), user authentication, shopping cart, order management, and tracking system.

**Status:** ✅ **PRODUCTION READY** - All core features implemented and tested

---

## 🌟 Key Features

### 👥 User Management
- ✅ User Registration with email validation
- ✅ User Login with JWT authentication
- ✅ Persistent user session (localStorage)
- ✅ User profile dropdown in navbar

### 🛍️ Product Catalog
- ✅ Browse 30+ products with pricing (₹)
- ✅ Product search and filtering
- ✅ Product details page with clickable cards
- ✅ Real-time product updates

### 🛒 Shopping Cart
- ✅ Add/remove items from cart
- ✅ Real-time cart updates
- ✅ Cart persistence across sessions (localStorage)
- ✅ Cart item count badge in navbar
- ✅ Dynamic price calculation with 18% tax

### 💳 Payment Processing
- ✅ **Razorpay Payment Gateway** integration
- ✅ 6 Payment Methods:
  - Credit Card 💳
  - Debit Card 🏧
  - UPI 📱
  - Net Banking 🏦
  - Digital Wallet 👛
  - Cash on Delivery 💰
- ✅ HMAC-SHA256 signature verification
- ✅ Secure payment processing

### 📋 Order Management
- ✅ Create orders with delivery address
- ✅ Order confirmation page with receipt
- ✅ Invoice generation and download (HTML)
- ✅ Order status tracking (Pending → Confirmed → Processing → Shipped → Delivered)
- ✅ Order history and details view
- ✅ Order cancellation with automatic refunds

### 📦 Order Tracking
- ✅ View all user orders
- ✅ Real-time order status updates
- ✅ Tracking number display (when shipped)
- ✅ Order cancellation capability
- ✅ Refund processing
- ✅ Order timeline visualization

### 🎨 UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional animations and transitions
- ✅ Global loading indicator (HTTP interceptor)
- ✅ Error messages and validation feedback
- ✅ Modern interface with blue accents
- ✅ Accessibility features

---

## 📊 Technology Stack

### Frontend
- **Framework:** Angular 13 with TypeScript (strict mode)
- **Styling:** CSS3 with animations
- **HTTP:** Angular HttpClient with RxJS Observables
- **Forms:** Template-driven forms with validation
- **Routing:** Angular Router

### Backend
- **Server:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Razorpay SDK
- **Security:** bcryptjs (password hashing)
- **Email Ready:** Nodemailer (for future notifications)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally)
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
npm start
# Backend running on http://localhost:3000
```

#### Frontend Setup (New Terminal)
```bash
npm install
ng serve
# Frontend running on http://localhost:4200
```

Open `http://localhost:4200` in browser

---

## 📊 API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login (returns JWT)
- `POST /api/auth/verify` - Verify JWT token

### Payment & Orders
- `POST /api/payments/create-razorpay-order` - Create order
- `POST /api/payments/verify-payment` - Verify payment
- `GET /api/payments/user-orders/:userId` - Get user orders
- `GET /api/payments/order/:orderId` - Get order details
- `POST /api/payments/order/:orderId/cancel` - Cancel order

---

## 🧪 Test Credentials

### Razorpay (Test Mode)
```
Key ID:     rzp_test_1DP5mmOlF5G5ag
Key Secret: i7XWvEjIrZkyAmutHmPaSpih
```

### Test Card (Razorpay)
```
Number: 4111111111111111
Expiry: 12/25
CVV:    123
```

---

## 📁 Project Structure

```
angular-shopping-cart/
├── src/ (Angular Frontend)
│   ├── app/
│   │   ├── components/ (10 components)
│   │   ├── services/ (9 services)
│   │   ├── models/
│   │   ├── interceptors/
│   │   └── app-routing.module.ts
│   └── styles.css
│
└── backend/ (Node.js)
    ├── server.js
    ├── Product*.js (schemas & routes)
    ├── User*.js (authentication)
    ├── Payment*.js (Razorpay integration)
    ├── Order*.js (order models)
    ├── razorpayConfig.js
    └── seed.js (database seeding)
```

See `PROJECT_STRUCTURE.md` for detailed architecture breakdown.

---

## ✅ Implementation Status

| Feature | Status |
|---------|--------|
| User Registration/Login | ✅ Complete |
| Product Catalog | ✅ Complete |
| Shopping Cart | ✅ Complete |
| Checkout Form | ✅ Complete |
| Razorpay Payment | ✅ Complete |
| COD Payment | ✅ Complete |
| Order Confirmation | ✅ Complete |
| Order Tracking | ✅ Complete |
| Invoice Download | ✅ Complete |
| Order Cancellation | ✅ Complete |
| Refund Processing | ✅ Complete |
| Responsive Design | ✅ Complete |

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing (bcryptjs)
- ✅ HMAC-SHA256 payment verification
- ✅ CORS protection
- ✅ Input validation
- ✅ MongoDB injection prevention

---

## 🐛 Troubleshooting

**Cart items disappearing?**
- CartService now persists to localStorage
- Clear cache if issues persist

**Payment not working?**
- Check backend is running on port 3000
- Verify Razorpay credentials
- Test with provided test card

**Orders not showing?**
- Ensure MongoDB is running
- Verify user is logged in
- Check JWT token validity

---

## 📝 Environment Setup

Create `.env` in `backend/` folder:
```
MONGODB_URI=mongodb://127.0.0.1:27017/shoppingcart
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=i7XWvEjIrZkyAmutHmPaSpih
JWT_SECRET=your_jwt_secret
```

---

**Version:** 1.0.0 | **Status:** ✅ Production Ready | **Last Updated:** Jan 26, 2026
## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- Angular CLI: `npm install -g @angular/cli`

## Project Setup

### 1. Clone or Extract Project

```bash
cd angular-shopping-cart
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Seed sample products (optional)
node seed.js

# Start the server
npm start
# Server will run on http://localhost:3000
```

**Backend Structure:**
- `server.js` - Main server file
- `User Schema.js` - User model
- `Product Schema.js` - Product model
- `Order Schema.js` - Order model
- `User Authentication.js` - Auth routes
- `Product API Routes.js` - Product CRUD routes
- `seed.js` - Sample data seeder

### 3. Frontend Setup

```bash
# In the root directory (angular-shopping-cart)

# Install dependencies
npm install

# Start development server
npm start
# Application will be available at http://localhost:4200
```

## Running the Application

### Start Backend First:
```bash
cd backend
npm start
```

### Then Start Frontend:
```bash
# In another terminal
npm start
```

### Access the Application:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000

## Available Scripts

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run unit tests
- `ng serve` - Run Angular dev server

### Backend
- `npm start` - Start server
- `node seed.js` - Populate sample products

## Project Structure

```
angular-shopping-cart/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── product-list/
│   │   │   ├── cart/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── product-details/
│   │   ├── services/
│   │   │   ├── product.service.ts
│   │   │   ├── cart.service.ts
│   │   │   └── auth.service.ts
│   │   ├── models/
│   │   │   └── product.model.ts
│   │   └── app.module.ts
│   └── index.html
├── backend/
│   ├── server.js
│   ├── User Schema.js
│   ├── Product Schema.js
│   ├── Order Schema.js
│   ├── User Authentication.js
│   ├── Product API Routes.js
│   ├── seed.js
│   └── package.json
└── package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## User Flow

1. **Homepage** - View all available products
2. **Add to Cart** - Click "Add to Cart" button on any product
3. **View Cart** - Click "Cart" in navbar to view cart items
4. **Remove Items** - Remove items from cart as needed
5. **Register/Login** - Create account or login
6. **Checkout** - Proceed to checkout (future enhancement)

## Sample Products

The application comes with 8 pre-configured sample products:
- Wireless Headphones
- Smart Watch
- Portable Speaker
- Wireless Charger
- USB-C Cable
- Phone Stand
- Screen Protector
- Phone Case

Run `node seed.js` in the backend directory to populate these products.

## Authentication

- **Registration**: Create new account with name, email, and password
- **Login**: Login with email and password
- **JWT Tokens**: Tokens are stored in localStorage for session management
- **Password Security**: Passwords are hashed using bcryptjs

## Future Enhancements

- [ ] Product search and filtering
- [ ] Product categories
- [ ] Order history
- [ ] Payment integration
- [ ] Admin panel
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Email notifications

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `backend/server.js`

### API Connection Issues
- Ensure backend is running on port 3000
- Check CORS settings in `backend/server.js`

### Port Already in Use
- Frontend port 4200: `ng serve --port 4300`
- Backend port 3000: Change port in `backend/server.js`

## Development Tips

1. **Debug Mode**: Open browser DevTools (F12) to inspect components
2. **API Testing**: Use Postman to test backend endpoints
3. **Database Inspection**: Use MongoDB Compass to view database

## Building for Production

### Frontend Build:
```bash
npm run build
# Build artifacts in dist/ directory
```

### Backend Deployment:
- Use services like Heroku, AWS, or DigitalOcean
- Update MongoDB connection string
- Set JWT_SECRET environment variable

## License

MIT

## Support

For issues or questions, please refer to the component/service comments or create an issue in your repository.

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Angular Material](https://material.angular.io/)

