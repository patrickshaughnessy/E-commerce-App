const { Transaction } = require('../data');

const processTransaction = async (req, res, next) => {
  const {
    user,
    body: { address, payment, cart },
  } = req;

  if (![user, address, payment, cart].every(param => !!param)) {
    const error = new Error('Something went wrong');
    error.status = 400;
    return next(error);
  }

  const transactionData = {
    user: user._id,
    address,
    payment,
    items: cart.items,
  };

  let transaction;
  try {
    transaction = await Transaction.create(transactionData);
  } catch (e) {
    const error = new Error('Something went wrong creating transaction');
    error.status = 400;
    return next(error);
  }

  return res.status(200).json(transaction);
};

module.exports = {
  processTransaction,
};
