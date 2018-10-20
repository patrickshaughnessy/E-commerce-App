import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import ProductInfo from './ProductInfo';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/products/:productId" component={ProductInfo} />
    </div>
  </Router>
);
export default App;
