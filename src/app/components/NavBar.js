import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class NavBar extends Component {
  componentDidMount() {
    console.log('nav did mount');
  }

  render() {
    const {
      user: { isLoggedIn },
      logout,
    } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          Best Store
        </Link>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <Link to="/" activeclassname="active" className="nav-item nav-link">
              Home
            </Link>
            <Link
              to="/sales"
              activeclassname="active"
              className="nav-item nav-link"
            >
              Sales
            </Link>
            <Link
              to="/about"
              activeclassname="active"
              className="nav-item nav-link"
            >
              About
            </Link>
          </div>
          <div className="navbar-nav justify-content-end">
            <Link
              to="/cart"
              activeclassname="active"
              className="nav-item nav-link"
            >
              Cart
            </Link>
            <Link
              to={isLoggedIn ? '/account' : '/login'}
              activeclassname="active"
              className="nav-item nav-link"
            >
              {isLoggedIn ? 'Account' : 'Login'}
            </Link>
            {isLoggedIn ? (
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
