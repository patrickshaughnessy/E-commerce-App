import React from 'react';
import { Link } from 'react-router-dom';

const Product = props => (
  <Link to={`/product/${props.id}`}>
    <div className="card">
      <img className="card-img-top" src={props.src} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          This is a longer card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer.
        </p>
      </div>
    </div>
  </Link>
);

export default Product;
