const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionMiddleware = ({ dbUrl }) => app => {
  app.use(
    session({
      secret: 'ecommerceAppSessionSecret',
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ url: dbUrl }),
    })
  );
  app.use((req, res, next) => {
    req.session.user = req.session.user || {
      _id: req.sessionID,
      cart: {
        items: [],
      },
    };
    req.session.cart = req.session.cart || {
      items: [],
    };

    next();
  });
};

module.exports = sessionMiddleware;
