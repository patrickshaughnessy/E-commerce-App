import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'recompose';

export const _Head = () => (
  <Helmet>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="application-name" content="E-commerce App" />
    <meta name="keywords" content="ecommerce, buy sell products" />
    <meta name="description" content="Everything you need for products" />
    <link rel="icon" href="favicon.ico" />
    <link rel="stylesheet" href="http://localhost:3000/styles.css" />
    <title>A Nice Store</title>
  </Helmet>
);

const Head = compose()(_Head);

export default Head;
