const { products } = require('../controllers');

const configureRoutes = app => {
  app.get('/products', products.fetchAll);
};

module.exports = configureRoutes;
