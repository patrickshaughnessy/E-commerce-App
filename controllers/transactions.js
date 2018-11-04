const { Transaction } = require('../data');

const fetchAll = async (req, res) => {
  console.log('req session', req.session);
  if (!(req.session.user && req.session.user.isAuthenticated)) {
    return res.status(401).end();
  }

  let transactions = [];
  try {
    transactions = await Transaction.find({
      userId: req.session.user._id,
    })
      .populate('items.product')
      .exec();
    // console.log('transactions', JSON.stringify(transactions, null, 2));
  } catch (e) {
    const error = new Error('Sorry, we could not fetch your transactions.');
    error.status = 400;
    return res.status(400).json(error);
  }

  return res.json(transactions);
};

const fetchOne = async (req, res) => {
  if (!(req.session.user && req.session.user.isAuthenticated)) {
    return res.status(401).end();
  }

  let transaction;
  try {
    transaction = await Transaction.findOne({
      userId: req.session.user._id,
      _id: req.params.id,
    }).exec();
    console.log('transactions', transaction);
  } catch (e) {
    console.log('error', e);
    const error = new Error('Sorry, we could not fetch your transaction.');
    error.status = 400;
    return res.status(400).json(error);
  }

  return res.json(transaction);
};

module.exports = {
  fetchAll,
  fetchOne,
};
