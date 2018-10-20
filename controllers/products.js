const { Product } = require('../data');

const fetchAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const fetchOne = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

module.exports = {
  fetchAll,
  fetchOne,
};
