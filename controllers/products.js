const fetchAll = (req, res, next) => {
  console.log('products');
  res.json('products');
};

module.exports = {
  fetchAll,
};
