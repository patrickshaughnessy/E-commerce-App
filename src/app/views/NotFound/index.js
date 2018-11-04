import React, { Fragment } from 'react';

const NotFound = () => (
  <Fragment>
    <div className="jumbotron jumbotron-fluid">
      <div className="container text-center">
        <h1 className="display-3">Sorry</h1>
        <p className="lead">
          Looks like you landed somewhere that does not exist
        </p>
      </div>
    </div>
  </Fragment>
);

export default NotFound;
