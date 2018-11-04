import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export const _Head = ({ assetsPath }) => (
  <Helmet>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
    <meta name="application-name" content="E-commerce App" />
    <meta name="keywords" content="best store, ecommerce, buy sell products" />
    <meta name="description" content="Everything you need for products" />
    <link rel="icon" href={`${assetsPath}/css/favicon.ico`} />
    <link rel="stylesheet" href={`${assetsPath}/css/styles.css`} />
    <title>A Nice Store</title>
  </Helmet>
);

const mapStateToProps = ({ application: { assetsPath } }) => ({
  assetsPath,
});

const Head = compose(connect(mapStateToProps))(_Head);

export default Head;
