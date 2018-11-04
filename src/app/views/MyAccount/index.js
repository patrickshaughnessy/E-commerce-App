import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import Address from './Address';
import Info from './Info';
import Orders from './Orders';
import Payment from './Payment';

const routeConfig = [
  {
    to: '/myaccount/orders',
    view: 'orders',
    text: 'My Orders',
    component: Orders,
  },
  {
    to: '/myaccount/address',
    view: 'address',
    text: 'My Addresses',
    component: Address,
  },
  {
    to: '/myaccount/payment',
    view: 'payment',
    text: 'My Payment Methods',
    component: Payment,
  },
  {
    to: '/myaccount/info',
    view: 'info',
    text: 'My Info',
    component: Info,
  },
];

class _MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('hello', this.props);
    const matchView = this.props.match.params.view;
    if (!matchView) {
      return <Redirect to="/myaccount/orders" />;
    }

    return (
      <div id="myAccountPage" className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>My Account</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <ul className="list-group">
              {routeConfig.map(route => (
                <Link
                  key={route.view}
                  className={`list-group-item list-group-item-action ${
                    route.view === matchView ? 'active' : ''
                  }`}
                  to={route.to}
                >
                  {route.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="col-xs-12 col-sm-8">
            <Switch>
              {routeConfig.map(route => (
                <Route
                  key={route.to}
                  path={route.to}
                  component={route.component}
                />
              ))}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default _MyAccount;
