const { Product } = require('../data');

const fetchAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports = {
  fetchAll,
};
