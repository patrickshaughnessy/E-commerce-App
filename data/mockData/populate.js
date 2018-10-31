const path = require('path');
const fse = require('fs-extra');
const mongoose = require('mongoose');
const { Product } = require('../products');

const populateProducts = async () => {
  try {
    // TODO - extract to mongo utils
    const dbUrl = 'mongodb://localhost/ecommerceApp';
    const dbOptions = { useNewUrlParser: true };
    mongoose.connect(
      dbUrl,
      dbOptions
    );
    const db = mongoose.connection;
    db.on('error', e => console.error('error connecting to mongodb', e));
    db.on('open', () => {
      console.log('connected');
    });

    const filePath = path.resolve(__dirname, 'products.json');
    const products = await fse.readJson(filePath);
    console.log('Prepared products:', products.length);
    await Product.deleteMany({});
    await Promise.all(products.map(product => Product.create(product)));
    console.log('Populated new products into DB');
  } catch (e) {
    console.error(`Error populating products to mongo: ${e.message}`);
  }
};

populateProducts();
