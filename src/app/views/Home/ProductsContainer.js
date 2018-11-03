import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import Product from './Product';
import Loading from '../../components/Loading';
import { fetchProducts } from '../../redux/products';

class _ProductsContainer extends Component {
  componentDidMount() {
    const { dispatchFetchProducts, productsList } = this.props;
    if (!productsList.length) {
      dispatchFetchProducts();
    }
  }

  render() {
    const { loading, productsList } = this.props;
    if (loading) {
      return <Loading message="Hang on, we're loading products" />;
    }

    return (
      <div className="container">
        <div className="card-columns">
          {productsList.map(product => (
            <Product key={v4()} {...product} />
          ))}
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
