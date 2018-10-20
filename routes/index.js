const { products } = require('../controllers');

const configureRoutes = app => {
  app.get('/api/products', products.fetchAll);
};

module.exports = configureRoutes;
