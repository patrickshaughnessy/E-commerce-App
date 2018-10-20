import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import Loading from './Loading';
import Product from './Product';
import { fetchProducts } from '../redux/products/reducer';

const renderProductThumbnail = product => (
  <div key={v4()} className="col-sm-4">
    <Product {...product} />
  </div>
);

class _ProductCarousel extends Component {
  componentDidMount() {
    const {
      dispatchFetchProducts,
      productsByCategory,
      product: { category },
    } = this.props;
    if (!productsByCategory[category]) {
      console.log('fetch');
      dispatchFetchProducts();
    }
  }

  render() {
    const {
      productsByCategory,
      product: { category, _id },
    } = this.props;
    const relatedProducts = productsByCategory[category];
    if (!relatedProducts) return null;

    const filteredProducts = relatedProducts.filter(p => p._id !== _id);

    const productRowsDesktop = filteredProducts.reduce((acc, product, i) => {
      if (i % 3 === 0) {
        acc.push([product]);
      } else {
        acc[acc.length - 1].push(product);
      }
      return acc;
    }, []);

    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {/* {productRowsDesktop.map((productRow, i) => (
            <div
              className={`d-none d-sm-block carousel-item ${
            i === 0 ? 'active' : ''
              }`}
            >
              <div className="row">
            {productRow.map(renderProductThumbnail)}
              </div>
            </div>
          ))} */}
          {filteredProducts.map((product, i) => (
            <div
              key={v4()}
              className={`d-block d-sm-none carousel-item ${
                i === 0 ? 'active' : ''
              }`}
            >
              <img
                className="d-block w-100"
                src={product.images[0]}
                alt="First slide"
              />
              {/* <Product {...product} /> */}
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

const mapStateToProps = ({ products: { loading, productsByCategory } }) => ({
  loading,
  productsByCategory,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProducts: fetchProducts(dispatch),
});

const ProductCarousel = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProductCarousel);

export default ProductCarousel;
