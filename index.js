const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const configureRoutes = require('./routes');

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

const port = process.env.NODE_ENV || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
configureRoutes(app);

// React / client middleware
app.use(express.static('dist'));

app.get('*', (req, res) => {
  console.log('rendering');
  return res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
