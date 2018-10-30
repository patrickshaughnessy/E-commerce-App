const update = async (req, res, next) => {
  const { productId, number } = req.body;

  if (!productId || !number) {
    const error = new Error('Something went wrong');
    error.status = 400;
    return next(error);
  }

  const sessionCart = req.session.cart;

  const itemIndex = sessionCart.items.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    sessionCart.items[itemIndex].number = number;
  } else {
    sessionCart.items.push({ id: productId, number });
  }

  req.session.cart.items = sessionCart.items.filter(item => item.number !== 0);

  return res.status(200).json({ cart: req.session.cart });
};

module.exports = {
  update,
};
