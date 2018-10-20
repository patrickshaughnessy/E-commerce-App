import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ _id, name, images, shortDescription, price }) => (
  <Link to={`/products/${_id}`}>
    <div className="card">
      <img className="card-img-top" src={images[0]} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">
          <span>{name}</span>
          <span className="float-right">{`$${price}`}</span>
        </h5>
        <p className="card-text">{shortDescription}</p>
      </div>
    </div>
  </Link>
);

export default Product;
