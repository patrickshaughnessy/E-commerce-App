const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/ecommerceApp',
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on('error', e => console.error('error connecting to mongodb', e));
db.on('open', () => {
  console.log('connected');
});

const configureRoutes = require('./routes');

const port = process.env.NODE_ENV || 3000;

const app = express();

configureRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
