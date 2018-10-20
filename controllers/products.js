const { Product } = require('../data');

const fetchAll = async (req, res) => {
  const products = await Product.find();

  setTimeout(() => {
    res.json(products);
  }, 3000);
};

module.exports = {
  fetchAll,
};
