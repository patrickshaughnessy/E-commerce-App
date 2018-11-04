const path = require('path');
const fse = require('fs-extra');
const { connect } = require('../../lib/mongo');
const { Product, Transaction, User } = require('../');

const populateProducts = async () => {
  try {
    const db = await connect();

    const filePath = path.resolve(__dirname, 'products.json');
    const products = await fse.readJson(filePath);

    await Product.deleteMany({});
    await Transaction.deleteMany({});
    await User.deleteMany({});
    console.log('Products, Transactions, Users deleted');

    await Promise.all(products.map(product => Product.create(product)));
    console.log('Populated new products into DB');

    await db.close();
  } catch (e) {
    console.error(`Error populating products to mongo: ${e.message}`);
  }
};

populateProducts();
