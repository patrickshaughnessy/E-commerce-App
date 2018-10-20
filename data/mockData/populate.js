const path = require('path');
const fse = require('fs-extra');
const { Product } = require('../products');

const populateProducts = async () => {
  try {
    const filePath = path.resolve(__dirname, 'products.json');
    const products = fse.readJson(filePath);

    await Product.deleteMany();
    await Promise.all(products.map(product => Product.create(product)));
  } catch (e) {
    console.error(`Error populating products to mongo: ${e.message}`);
  }
};

populateProducts();
