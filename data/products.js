const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  price: Number,
  salePrice: Number,
  category: String,
  name: String,
  shortDescription: String,
  longDescription: [String],
  images: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
};
