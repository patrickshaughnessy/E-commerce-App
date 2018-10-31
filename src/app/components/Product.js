import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ _id, name, images, shortDescription, price }) => (
  <Link to={`/products/${_id}`} className="product">
    <div className="card">
      <div className="card-header">
        <img src={images[0]} alt="Card cap" />
      </div>

      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {`$${Number(price).toFixed(2)}`}
        </h6>
        <p className="card-text">{shortDescription}</p>
      </div>
    </div>
  </Link>
);

export default Product;
