import React from 'react';

const Product = (props) => {
  console.log('props', props);
  return (
    <div className="container">
      <div className="row">
        <p>
          Product {props.match.params.productId}
        </p>
      </div>
    </div>
  );
};

export default Product;
