import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Head from './components/Head';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import About from './views/About';
import Home from './views/Home';
import Product from './views/Product';
import Login from './views/Login';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import Signup from './views/Signup';
import NotFound from './views/NotFound';

const App = () => (
  <Fragment>
    <Head />
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products/:productId" component={Product} />
      <Route path="/login" component={Login} />
      <Route path="/cart" component={Cart} />
      <PrivateRoute path="/checkout" component={Checkout} />
      <Route path="/signup" component={Signup} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Fragment>
);

export default App;
