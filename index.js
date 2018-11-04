const path = require('path');
const express = require('express');

const serveStatic = require('serve-static');
const configureRoutes = require('./routes');
const bodyParserMiddleware = require('./middleware/bodyParser');
const sessionMiddleware = require('./middleware/session');
const configureRender = require('./dist/server');
const { dbUrl, connect } = require('./lib/mongo');

connect()
  .then(() => {
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

    app.listen(port, () => console.log(`App listening on port ${port}`));
  })
  .catch(e => {
    console.error('Startup error', e);
    process.exit(1);
  });
