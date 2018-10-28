const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const serveStatic = require('serve-static');
const configureRoutes = require('./routes');
const bodyParserMiddleware = require('./middleware/bodyParser');
const sessionMiddleware = require('./middleware/session');
const configureRender = require('./dist/server');

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

const port = process.env.PORT || 3000;
const app = express();

// Middleware
bodyParserMiddleware()(app);
sessionMiddleware({ dbUrl })(app);

// API routes
configureRoutes(app);

// React / client middleware
app.use(serveStatic(path.join(__dirname, 'dist')));

configureRender(app);

// app.get('*', (req, res) => {
//   console.log('rendering', req.method, req.url, req.session);
//   // TODO - SSR refactor
//   // return res.render('index');
//   return res.sendFile(path.join(`${__dirname}/dist/index.html`));
// });

try {
  app.listen(port, () => console.log(`App listening on port ${port}`));
} catch (e) {
  console.log('errrrrrr', e);
}
