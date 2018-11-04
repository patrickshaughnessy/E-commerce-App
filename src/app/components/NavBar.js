import React, { Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { logout } from '../redux/user';

export const navCollapseId = 'navCollapseId';
export const navCollapseProps = {
  'data-target': `#${navCollapseId}`,
  'data-toggle': 'collapse',
};

// NOTE - Bootstrap navbar toggle uses event.preventDefault() which prevents Link transition
export const CustomNavLink = ({ to, exact, children }) => {
  // Outer = full size nav bar link
  // Inner = collapse nav link
  const generateLink = outer => (
    <NavLink
      to={to}
      exact={exact}
      activeClassName="active"
      className={`nav-item nav-link ${outer ? 'd-none d-sm-block' : ''}`}
    >
      {children}
    </NavLink>
  );
  return (
    <Fragment>
      {generateLink(true)}
      <button
        type="button"
        className="navbar-toggler collapseButton"
        {...navCollapseProps}
      >
        {generateLink()}
      </button>
    </Fragment>
  );
};

export const _NavBar = ({ isAuthenticated, dispatchLogout, items }) => (
  <nav id="topNav" className="navbar navbar-expand-lg navbar-dark bg-primary">
    <NavLink to="/" className="navbar-brand">
      Best Store
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      {...navCollapseProps}
      aria-controls={navCollapseId}
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id={navCollapseId}>
      <div className="navbar-nav mr-auto">
        <CustomNavLink to="/" exact>
          Home
        </CustomNavLink>
        <CustomNavLink to="/about" exact>
          About
        </CustomNavLink>
      </div>
      <div className="navbar-nav justify-content-end">
        <CustomNavLink to="/cart" exact>
          <span>
            Cart
            <sup className="badge badge-primary">{items.length}</sup>
          </span>
        </CustomNavLink>
        <CustomNavLink to={isAuthenticated ? '/myaccount' : '/login'}>
          {isAuthenticated ? 'Account' : 'Login'}
        </CustomNavLink>
        {isAuthenticated ? (
          <button
            type="button"
            className="btn btn-link nav-link"
            onClick={dispatchLogout}
            {...navCollapseProps}
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  </nav>
);

const mapStateToProps = ({ user: { isAuthenticated }, cart: { items } }) => ({
  isAuthenticated,
  items,
});

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => dispatch(logout()),
});

const NavBar = compose(
  withRouter, // needed for navlinks to highlight properly
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_NavBar);

export default NavBar;
