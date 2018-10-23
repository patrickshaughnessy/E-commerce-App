import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Home from './Home';
import ProductInfo from './ProductInfo';
import Login from './Login';

import { fetchUser, logout } from '../redux/user/reducer';

export class _App extends Component {
  componentDidMount() {
    this.props.dispatchFetchUser();
  }

  render() {
    const { user, dispatchLogout } = this.props;
    return (
      <Router>
        <div>
          <NavBar user={user} logout={dispatchLogout} />
          <Route exact path="/" component={Home} />
          <Route path="/products/:productId" component={ProductInfo} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
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

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(_App);

export default App;
