import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

export const _PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = ({ user: { isAuthenticated } }) => ({
  isAuthenticated,
});

const PrivateRoute = compose(
  connect(
    mapStateToProps,
    null
  )
)(_PrivateRoute);

export default PrivateRoute;
