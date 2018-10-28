import React from 'react';
import { withRouter } from 'react-router-dom';

import Jumbotron from './Jumbotron';
import ProductsContainer from './ProductsContainer';

const Home = () => (
  <div>
    <Jumbotron />
    <ProductsContainer />
  </div>
);

export default withRouter(Home);
