const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
  user: Schema.Types.ObjectId,
  address: {
    name: String,
    addressLines: [String],
    city: String,
    state: String,
    zip: String,
  },
  payment: {
    amount: Schema.Types.Decimal128,
    card: String,
  },
  items: [
    {
      id: Schema.Types.ObjectId,
      number: Number,
    },
  ],
});

const Transaction = model('Transaction', transactionSchema);

module.exports = {
  Transaction,
};
