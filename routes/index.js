const { products, users, cart, checkout } = require('../controllers');

const configureRoutes = app => {
  app.get('/api/products/:id', products.fetchOne);
  app.get('/api/products', products.fetchAll);

  app.get('/api/cart', (req, res) => res.json({ cart: req.session.cart }));
  app.put('/api/cart', cart.update);

  app.post('/api/checkout', auth.ensureLoggedIn, checkout.processTransaction);

  app.post('/api/users/login', users.login, users.sendResponse);
  app.post('/api/users/logout', users.logout);
  app.post('/api/users/create', users.create, users.login, users.sendResponse);

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  });
};

module.exports = configureRoutes;
