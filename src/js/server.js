import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import cheerio from 'cheerio';

import { configureStore } from './shared';
import Root from '../app/Root';

const html = `<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <div id="root"></div>
  <script id="react-client-script" type="text/javascript"></script>
  <script id="react-init-props" type="application/json"></script>
</body>
</html>
`;

const isDev = process.env.NODE_ENV === 'development';

const generateHtml = ({ markup, data, assetsPath }) => {
  const helmet = Helmet.renderStatic();
  const $template = cheerio.load(html);

  // Set language
  $template('html').attr('lang', 'en');

  $template('head').append(
    helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
  );

  $template('#root').html(markup);

  // $template('#react-client-script').attr('src', `client.js`);
  $template('#react-client-script').attr('src', `${assetsPath}/js/client.js`);
  $template('#react-init-props').html(
    JSON.stringify(data).replace(/</g, '\\u003c')
  );

  if (isDev) {
    $template('head').append(
      `<script id="css-hmr-script" type="text/javascript" src="${assetsPath}/css/styles.js"></script>`
    );
  }

  return $template.html();
};

module.exports = app => {
  app.get('/*', (req, res) => {
    const protocol = isDev ? 'http' : 'https';
    const port = isDev ? `:${process.env.PORT || '3000'}` : '';
    const assetsPath = `${protocol}://${req.hostname}${port}`;

    console.log('assetsPath', assetsPath);
    const data = Object.assign({}, req.model, {
      application: {
        assetsPath,
      },
      cart: req.session.cart,
      user: req.session.user,
    });

    const store = configureStore(data);

    const context = {};
    const Application = (
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Root />
        </StaticRouter>
      </Provider>
    );
    const markup = ReactDOMServer.renderToString(Application);
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      const renderedHtml = generateHtml({
        markup,
        data,
        assetsPath,
      });
      res.send(renderedHtml);
    }
  });
};
