import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Head from './components/Head';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductInfo from './components/ProductInfo';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Signup from './components/Signup';

import { fetchUser, logout } from './redux/user/reducer';

export const NotFound = () => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = 'NOT_FOUND';
      }
      return <div>NOT FOUND</div>;
    }}
  />
);

export class _App extends Component {
  componentDidMount() {
    console.log('did mount');
    // this.props.dispatchFetchUser();
  }

  render() {
    const { user, dispatchLogout } = this.props;
    return (
      <Fragment>
        <Head />
        <NavBar user={user} logout={dispatchLogout} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/:productId" component={ProductInfo} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/signup" component={Signup} />
          <NotFound />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});
const mapDispatchToProps = dispatch => ({
  dispatchFetchUser: fetchUser(dispatch),
  dispatchLogout: () => dispatch(logout()),
});

const App = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_App);

export default App;
