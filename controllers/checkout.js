const { Transaction } = require('../data');

const processTransaction = async (req, res, next) => {
  const {
    body: { address, payment },
    session: { user, cart },
  } = req;

  if (![user, address, payment, cart].every(param => !!param)) {
    console.log('missing params');
    const error = new Error('Something went wrong');
    error.status = 400;
    return next(error);
  }

  const transactionData = {
    userId: user.id,
    address,
    payment,
    items: cart.items.map(item => ({
      product: item.id,
      quantity: item.quantity,
    })),
  };
  console.log('transactionData', transactionData);
  let transaction;
  try {
    transaction = await Transaction.create(transactionData);
  } catch (e) {
    console.log('transaction error', e);
    const error = new Error('Something went wrong creating transaction');
    error.status = 400;
    return next(error);
  }

  req.session.cart = {
    items: [],
  };

  return res.status(200).json(transaction);
};

module.exports = {
  processTransaction,
};
