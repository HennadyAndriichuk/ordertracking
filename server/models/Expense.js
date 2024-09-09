const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  advertising: { type: Number, required: true },
  returnCosts: { type: Number, required: true },
  defectCosts: { type: Number, required: true },
  hostingCosts: { type: Number, required: true },
  otherCosts: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
