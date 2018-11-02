const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
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
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  Transaction,
};
