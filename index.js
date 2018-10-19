const express = require('express');

const configureRoutes = require('./routes');

const port = process.env.NODE_ENV || 3000;

const app = express();

configureRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
