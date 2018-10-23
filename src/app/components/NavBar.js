import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user: { isLoggedIn }, logout }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/" className="navbar-brand">
      A Nice Store
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
        <Link to="/" className="nav-item nav-link">
          Home
        </Link>
        <Link to="/sales" className="nav-item nav-link">
          Sales
        </Link>
        <Link to="/about" className="nav-item nav-link">
          About
        </Link>
      </div>
      <div className="nav justify-content-end">
        <Link to="/cart" className="nav-item nav-link">
          Cart
        </Link>
        <Link
          to={isLoggedIn ? '/account' : '/login'}
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

export default NavBar;
