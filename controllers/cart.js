const _ = require('lodash');

const update = async (req, res, next) => {
  const { productId, remove } = req.body;

  if (!productId) {
    const error = new Error('Something went wrong');
    error.status = 400;
    return next(error);
  }

  const { cart } = req.session;

  if (remove) {
    cart.items = cart.items.filter(item => item.id === productId);
  } else {
    cart.items.push({ id: productId });
  }

  return res.status(200).json({ cart: req.session.cart });
};

module.exports = {
  update,
};
