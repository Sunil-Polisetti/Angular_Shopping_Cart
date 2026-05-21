# Angular Shopping Cart - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js installed
- MongoDB running locally

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Seed Sample Products
```bash
node seed.js
```

### Step 3: Start Backend Server
```bash
npm start
# Backend runs on http://localhost:3000
```

### Step 4: In a new terminal, Install Frontend Dependencies
```bash
cd ..
npm install
```

### Step 5: Start Frontend
```bash
npm start
# Frontend runs on http://localhost:4200
```

### Step 6: Open in Browser
- Visit http://localhost:4200
- Browse products and add them to cart
- Register/Login to test authentication

---

## 🎯 Features to Test

1. **Product Browsing**
   - Homepage displays product grid
   - Each product has image, name, description, and price

2. **Shopping Cart**
   - Add products to cart from product list
   - View cart with all added items
   - Remove items from cart
   - Automatic total calculation

3. **User Authentication**
   - Register new account
   - Login with credentials
   - Logout functionality
   - User info display in navbar

4. **Responsive Design**
   - Works on desktop, tablet, and mobile
   - Adaptive grid layout
   - Mobile-friendly navigation

---

## 📁 Key Files

### Frontend Components
- `src/app/components/product-list/` - Product display
- `src/app/components/cart/` - Shopping cart
- `src/app/components/login/` - Login form
- `src/app/components/register/` - Registration form
- `src/app/components/navbar/` - Navigation bar

### Frontend Services
- `src/app/services/product.service.ts` - Product API calls
- `src/app/services/cart.service.ts` - Cart state management
- `src/app/services/auth.service.ts` - Authentication logic

### Backend Files
- `backend/server.js` - Main server
- `backend/Product API Routes.js` - Product endpoints
- `backend/User Authentication.js` - Auth endpoints
- `backend/seed.js` - Sample data

---

## 🔍 Debugging

### Check Backend Connection
```bash
curl http://localhost:3000
# Should return: {"message":"Shopping Cart API is running"}
```

### Check Products
```bash
curl http://localhost:3000/api/products
# Should return array of products
```

### View Logs
- Frontend: Check browser console (F12)
- Backend: Check terminal output

---

## ⚙️ Configuration

### Change API URL
Edit `src/app/services/product.service.ts` and `src/app/services/auth.service.ts`

### Change MongoDB Connection
Edit `backend/server.js` line 14

### Change Ports
- Frontend: `ng serve --port 5200`
- Backend: Edit `backend/server.js` last line

---

## 🚨 Troubleshooting

**Backend won't start?**
- Check MongoDB is running: `mongod`
- Check port 3000 is available

**Frontend blank?**
- Check browser console for errors
- Verify backend is running
- Try: `npm start` from root directory

**Can't add to cart?**
- Check browser DevTools Network tab
- Verify products loaded: `curl http://localhost:3000/api/products`

**Login doesn't work?**
- Check MongoDB has users collection
- Try registering a new account first

---

## 📊 API Examples

### Get All Products
```bash
GET http://localhost:3000/api/products
```

### Register User
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🎓 Learning Resources

- **Angular**: https://angular.io/docs
- **Express**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **REST APIs**: https://restfulapi.net/

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Sample data seeded
- [ ] Backend server running
- [ ] Frontend dependencies installed
- [ ] Frontend running
- [ ] Can view products
- [ ] Can add to cart
- [ ] Can register/login

---

## 🎉 You're All Set!

The application is now ready for development and testing. Happy coding!
