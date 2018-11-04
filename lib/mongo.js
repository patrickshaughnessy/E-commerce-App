const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/ecommerceApp';

const connect = () =>
  new Promise((resolve, reject) => {
    const dbOptions = { useNewUrlParser: true };
    mongoose.connect(
      dbUrl,
      dbOptions
    );
    const db = mongoose.connection;
    db.on('error', error => {
      console.error('error connecting to mongodb', error);
      reject(error);
    });
    db.on('open', () => {
      console.log('connected to DB');
      resolve(db);
    });
  });

module.exports = {
  dbUrl,
  connect,
};
