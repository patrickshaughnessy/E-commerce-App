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
import MyAccount from './views/MyAccount';
import NotFound from './views/NotFound';

const App = () => (
  <Fragment>
    <Head />
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/checkout" component={Checkout} />
      <PrivateRoute
        path="/myaccount/:view(orders|address|payment|info)?/:id?"
        component={MyAccount}
      />
      <Route path="/about" component={About} />
      <Route path="/products/:productId" component={Product} />
      <Route path="/login" component={Login} />
      <Route path="/cart" component={Cart} />
      <Route path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default App;
