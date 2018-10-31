import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import Product from './Product';
import Loading from './Loading';
import { fetchProducts } from '../redux/products/reducer';

class _ProductsContainer extends Component {
  componentDidMount() {
    const { dispatchFetchProducts, productsList, loading } = this.props;
    // TODO - add error check as well
    if (!productsList.length && !loading) {
      dispatchFetchProducts();
    }
  }

  render() {
    const { loading, productsList } = this.props;
    if (loading) {
      return <Loading message="Hang on, we're loading products" />;
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
        <div key={v4()} className="card-columns">
          {productRows.map(productRow =>
            productRow.map(product => (
              <Product key={v4()} id={v4()} {...product} />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products: { loading, productsList } }) => ({
  loading,
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
