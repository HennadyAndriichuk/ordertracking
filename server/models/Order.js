const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  orderNumber: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
  documentSum: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  cost: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
