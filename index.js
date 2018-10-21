const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const configureRoutes = require('./routes');

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

const port = process.env.NODE_ENV || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'ecommerceAppSessionSecret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: dbUrl }),
  })
);

// API routes
configureRoutes(app);

// React / client middleware
app.use(express.static('dist'));

app.get('*', (req, res) => {
  console.log('rendering', req.method, req.url, req.session.userId);
  // TODO - SSR refactor
  // return res.render('index');
  return res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
