import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
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
        {/* <form className="nav-item form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-sm btn-outline-success" type="submit">
            Search
          </button>
        </form> */}
      </div>
      <div className="nav justify-content-end">
        <Link to="/cart" className="nav-item nav-link">
          Cart
        </Link>
        <Link to="/account" className="nav-item nav-link">
          Login
        </Link>
      </div>
    </div>
  </nav>
);

export default NavBar;
