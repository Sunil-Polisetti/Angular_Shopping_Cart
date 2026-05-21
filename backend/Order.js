const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('./OrderSchema');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key_change_this_in_production';

// Simple auth middleware (expects Bearer token)
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Place a new order (requires authentication)
router.post('/place-order', authenticate, async (req, res) => {
  try {
    const { items, deliveryAddress, priceBreakdown, paymentMethod, paymentDetails } = req.body;

    const orderNumber = 'ORD-' + Date.now();

    const order = new Order({
      user: req.userId,
      orderNumber,
      orderStatus: 'pending',
      paymentMethod: paymentMethod || 'Cash on Delivery',
      paymentDetails: paymentDetails || { paymentStatus: 'pending' },
      deliveryAddress,
      items,
      priceBreakdown
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ message: error.message || 'Failed to place order' });
  }
});

// Get orders for the logged in user
router.get('/my', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch orders' });
  }
});

// Get order details (must belong to logged in user)
router.get('/:orderId', authenticate, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch order details' });
  }
});

// Cancel an order
router.post('/:orderId/cancel', authenticate, async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findOne({ _id: req.params.orderId, user: req.userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.orderStatus === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    // Only allow cancellation in early stages
    const cancellableStatuses = ['pending', 'confirmed', 'processing'];
    if (!cancellableStatuses.includes(order.orderStatus)) {
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    }

    order.orderStatus = 'cancelled';
    order.cancelReason = reason || 'No reason provided';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: error.message || 'Failed to cancel order' });
  }
});

module.exports = router;
