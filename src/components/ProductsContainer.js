import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import Product from './Product';
import { fetchProducts } from '../redux/products/reducer';

class _ProductsContainer extends Component {
  componentDidMount() {
    this.props.dispatchFetchProducts();
  }

  render() {
    const { loading, productsList } = this.props;
    if (loading) {
      return <p>Loading</p>;
    }

    const productRows = productsList.reduce((acc, product, i) => {
      if (i % 3 === 0) {
        acc.push([product]);
      } else {
        acc[acc.length - 1].push(product);
      }
      return acc;
    }, []);

    return (
      <div className="container">
        {productRows.map(productRow => (
          <div key={v4()} className="card-columns">
            {productRow.map(product => (
              <Product key={v4()} id={v4()} {...product} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ products: { productsList } }) => ({
  productsList,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProducts: fetchProducts(dispatch),
});

const ProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProductsContainer);

export default ProductsContainer;
