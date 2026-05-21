const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, default: 0 }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true }
}, { _id: false });

const PriceBreakdownSchema = new mongoose.Schema({
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderNumber: { type: String, required: true, unique: true },
  orderStatus: { type: String, default: 'pending' },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  paymentDetails: { type: Object, default: {} },
  deliveryAddress: { type: AddressSchema, required: true },
  items: { type: [OrderItemSchema], required: true },
  priceBreakdown: { type: PriceBreakdownSchema, required: true },
  cancelReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
