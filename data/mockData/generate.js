const path = require('path');
const fse = require('fs-extra');
const products = require('../utils/product');

const generateMockData = async () => {
  try {
    const filePath = path.resolve(__dirname, 'products.json');
    await fse.writeJSON(filePath, products.generateAll(), { spaces: 2 });
  } catch (e) {
    console.error(`Error writing products JSON: ${e.message}`);
  }
};

generateMockData();
