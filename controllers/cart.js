const update = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    console.log('error in cart', productId, quantity);
    const error = new Error('Something went wrong');
    error.status = 400;
    return next(error);
  }

  const sessionCart = req.session.cart;

  const itemIndex = sessionCart.items.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    sessionCart.items[itemIndex].quantity = quantity;
  } else {
    sessionCart.items.push({ id: productId, quantity });
  }

  req.session.cart.items = sessionCart.items.filter(
    item => item.quantity !== 0
  );

  return res.status(200).json({ cart: req.session.cart });
};

module.exports = {
  update,
};
