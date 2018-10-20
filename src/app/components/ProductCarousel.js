import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import Loading from './Loading';
import { fetchProducts } from '../redux/products/reducer';

class _ProductInfo extends Component {
  componentDidMount() {
    const { dispatchFetchProducts, productsByCategory, category } = this.props;
    if (!productsByCategory) {
      console.log('fetch');
      // dispatchFetchProducts();
    }
  }

  render() {
    const {
      // loading,
      productsByCategory,
      category,
    } = this.props;

    console.log('product carousel');
    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row">
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200/842F95/FFFFFF/?text=Mouse+Pad"
                  alt="First slide"
                />
              </div>
            </div>
          </div>
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

const ProductInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProductInfo);

export default ProductInfo;
