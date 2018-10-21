const { products, users } = require('../controllers');

const configureRoutes = app => {
  app.get('/api/products/:id', products.fetchOne);
  app.get('/api/products', products.fetchAll);

  app.post('/api/users/login', users.login, users.sendResponse);
  app.post('/api/users/create', users.create, users.sendResponse);
  app.get('/api/users/:id', users.fetchOne, users.sendResponse);

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  });
};

module.exports = configureRoutes;
