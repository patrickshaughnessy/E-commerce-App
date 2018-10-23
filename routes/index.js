const { products, users } = require('../controllers');

const configureRoutes = app => {
  app.get('/api/products/:id', products.fetchOne);
  app.get('/api/products', products.fetchAll);

  app.get('/api/users/cart', users.sendResponse);
  app.put('/api/users/cart', users.updateCart, users.sendResponse);
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
