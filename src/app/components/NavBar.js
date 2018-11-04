import React, { Component, Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

const CustomNavLink = ({ to, exact, children }) => {
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
        href="#navbarSupportedContent"
        data-toggle="collapse"
      >
        {generateLink()}
      </button>
    </Fragment>
  );
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
  }

  toggleNav = () => {
    console.log('clicked', this);
    console.log('ref', this.navRef.current.className);
    this.navRef.current.className += ' hide';
  };

  render() {
    console.log('navbar render');
    const isAuthenticated = false;
    const logout = () => {};
    return (
      <nav
        id="topNav"
        className="navbar navbar-expand-lg navbar-dark bg-primary"
      >
        <NavLink to="/" className="navbar-brand">
          Best Store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          ref={this.navRef}
        >
          <div className="navbar-nav mr-auto">
            <CustomNavLink to="/" exact>
              Home
            </CustomNavLink>
            <CustomNavLink to="/about">About</CustomNavLink>
          </div>
          <div className="navbar-nav justify-content-end">
            <CustomNavLink to="/cart">Cart</CustomNavLink>
            <CustomNavLink to={isAuthenticated ? '/account' : '/login'}>
              {isAuthenticated ? 'Account' : 'Login'}
            </CustomNavLink>
            {isAuthenticated ? (
              <button
                type="button"
                href="#"
                className="btn btn-link nav-item nav-link"
                onClick={logout}
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
