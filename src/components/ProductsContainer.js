import React from 'react';
import { v4 } from 'uuid';

import Product from './Product';

const ProductsContainer = () => {
  const images = () => Array(3)
    .fill(1)
    .map(() => 'http://dummyimage.com/200x200/000/00ffd5.png&text=Image');
  const imageRows = Array(4)
    .fill(1)
    .map(images);

  return (
    <div className="container">
      {imageRows.map(imageRow => (
        <div key={v4()} className="card-columns">{imageRow.map(image => <Product key={v4()} id={v4()} src={image} />)}</div>
      ))}
    </div>
  );
};

export default ProductsContainer;
