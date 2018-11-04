const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    name: String,
    addressLines: [String],
    city: String,
    state: String,
    zip: String,
  },
  payment: {
    amount: Number,
    card: String,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  Transaction,
};
