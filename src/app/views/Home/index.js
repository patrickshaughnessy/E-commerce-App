import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Jumbotron from './Jumbotron';
import ProductsContainer from './ProductsContainer';

const Home = () => (
  <Fragment id="homePage">
    <Jumbotron />
    <ProductsContainer />
  </Fragment>
);

export default withRouter(Home);
