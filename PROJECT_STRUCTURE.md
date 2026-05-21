# Angular Shopping Cart - Project Structure

## 📁 Frontend Structure (Angular 13)

```
src/
├── app/
│   ├── components/          # Smart & Presentational Components
│   │   ├── navbar/          # Navigation header with user menu
│   │   ├── product-list/    # Product listing with search/filter
│   │   ├── product-details/ # Single product details page
│   │   ├── cart/            # Shopping cart display
│   │   ├── checkout/        # Checkout form & payment gateway
│   │   ├── order-confirmation/  # Order success page
│   │   ├── order-tracking/  # Order history & tracking
│   │   ├── login/           # User authentication
│   │   ├── register/        # User registration
│   │   └── loading/         # Global loading indicator
│   │
│   ├── services/            # Business Logic & API Communication
│   │   ├── auth.service.ts      # User authentication
│   │   ├── product.service.ts   # Product data management
│   │   ├── cart.service.ts      # Shopping cart state (localStorage)
│   │   ├── order.service.ts     # Order state & API
│   │   ├── payment.service.ts   # Razorpay integration
│   │   ├── loading.service.ts   # Global loading state
│   │   └── *.spec.ts            # Unit tests
│   │
│   ├── models/              # TypeScript Interfaces & Models
│   │   └── product.model.ts
│   │
│   ├── interceptors/        # HTTP Interceptors
│   │   └── loading.interceptor.ts  # Global loading overlay
│   │
│   ├── app.module.ts        # Root module declarations
│   ├── app-routing.module.ts # Route configuration
│   ├── app.component.*      # Root component
│   └── app.component.spec.ts
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── assets/
├── styles.css
└── main.ts

```

## 🔌 Backend Structure (Node.js/Express)

```
backend/
├── server.js                # Express app entry point
├── package.json             # Dependencies
│
├── Models (Schemas)
│   ├── Product Schema.js    # Product model
│   ├── User Schema.js       # User model with JWT
│   ├── Order.js             # Order model with payment details
│   └── Order Schema.js      # Additional order schema
│
├── Routes (API Endpoints)
│   ├── Product API Routes.js    # GET /products, /products/:id
│   ├── User Authentication.js   # POST /register, /login, /verify
│   └── Payment API Routes.js    # Payment & order endpoints
│
├── Configuration
│   ├── razorpayConfig.js    # Razorpay test credentials
│   └── .env.example         # Environment variables template
│
├── Utilities
│   ├── seed.js              # Database seeding (30+ products)
│   └── node_modules/        # Dependencies (13 packages)
│
└── Features
    ├── User authentication (JWT)
    ├── Product management
    ├── Shopping cart
    ├── Razorpay payment processing
    ├── Order management
    └── Order tracking & cancellation
```

## 🔄 Data Flow Architecture

### **User Journey**
```
1. Register/Login → JWT token stored in localStorage
2. Browse Products → GET /api/products
3. Add to Cart → Client-side (localStorage)
4. Checkout → Create order, select payment method
5. Payment → Razorpay modal OR COD selection
6. Confirmation → Order confirmation page
7. Track Order → View order history and status
```

### **Payment Flow**
```
Online Payment:
  Form → Create Order (DB) → Get Razorpay Order ID → Open Modal 
  → Razorpay processes payment → Verify signature (HMAC-SHA256) 
  → Update order status → Confirmation

Cash on Delivery (COD):
  Form → Create Order (COD status) → Simulate processing 
  → Confirmation
```

## 📊 API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login, returns JWT
- `POST /api/auth/verify` - Verify JWT token

### Payment & Orders
- `POST /api/payments/create-razorpay-order` - Create order + Razorpay order
- `POST /api/payments/verify-payment` - Verify payment signature
- `GET /api/payments/user-orders/:userId` - Get user's orders
- `GET /api/payments/order/:orderId` - Get order details
- `POST /api/payments/order/:orderId/cancel` - Cancel order & refund

## 🔐 Security Features

1. **JWT Authentication**
   - User tokens stored in localStorage
   - Verified on each request

2. **Payment Verification**
   - HMAC-SHA256 signature validation
   - Razorpay test credentials

3. **Cart Persistence**
   - Client-side localStorage
   - Survives page refresh

4. **Order Tracking**
   - User-specific order retrieval
   - Order cancellation with refunds

## 📦 Dependencies

### Frontend (Angular 13)
- @angular/core, @angular/router, @angular/forms
- rxjs (observables)
- HTTP client for API calls

### Backend (Node.js)
- express (5.0K - web framework)
- mongoose (ODM for MongoDB)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- razorpay (payment gateway)
- nodemailer (email notifications)
- cors (cross-origin requests)

### Database
- MongoDB (local: mongodb://127.0.0.1:27017/shoppingcart)

## 🎯 Features Implemented

✅ User Authentication (Register/Login with JWT)
✅ Product Listing (30+ seeded products)
✅ Product Details Page
✅ Shopping Cart (with localStorage persistence)
✅ Checkout Form (address, payment method validation)
✅ Razorpay Payment Gateway (6 payment methods)
✅ Order Confirmation Page (with invoice download)
✅ Order Tracking & History
✅ Order Cancellation with automatic refunds
✅ Global Loading Indicator (HTTP interceptor)
✅ Responsive Design (mobile, tablet, desktop)
✅ Error Handling & Validation

## 🎯 Features Pending

⏳ Email Notifications (order confirmation, shipping)
⏳ Admin Dashboard (order status management)
⏳ Real-time Order Updates (WebSocket)
⏳ Return/Exchange Management
⏳ Payment History Analytics
⏳ Customer Support Chat

## 🚀 Running the Project

### Terminal 1: Backend
```bash
cd backend
npm install
npm start
# Server running on http://localhost:3000
```

### Terminal 2: Frontend
```bash
ng serve
# Server running on http://localhost:4200
```

## 🧪 Test Credentials

**Razorpay (Test Mode)**
- Key ID: `rzp_test_1DP5mmOlF5G5ag`
- Key Secret: `i7XWvEjIrZkyAmutHmPaSpih`

**Sample User**
- Email: user@example.com
- Password: Any password (password field not restricted in test)

## 📝 Environment Variables

Create `.env` in backend folder:
```
MONGODB_URI=mongodb://127.0.0.1:27017/shoppingcart
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=i7XWvEjIrZkyAmutHmPaSpih
JWT_SECRET=your_jwt_secret_key
```

## 🔄 Component Lifecycle

1. **App Load** → Load interceptor (global loading bar)
2. **Auth Check** → Check localStorage for user
3. **Component Init** → Load data via services
4. **User Interaction** → Update cart, navigate routes
5. **Checkout** → Create order, process payment
6. **Post-Order** → Save to DB, display confirmation
7. **Tracking** → Retrieve order history, allow cancellation

---

**Last Updated:** January 26, 2026
**Version:** 1.0 - Production Ready for E-commerce MVP
