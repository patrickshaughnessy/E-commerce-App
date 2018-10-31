import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import Loading from './Loading';
import { fetchProduct } from '../redux/products/reducer';
import { updateCart } from '../redux/cart/reducer';

class _ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      images: [],
    };
  }

  componentDidMount() {
    const { dispatchFetchProduct, productsById, productId } = this.props;
    if (!productsById[productId]) {
      dispatchFetchProduct(productId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { images } = this.state;
    const product = nextProps.productsById[nextProps.productId];
    if (!images.length && product) {
      this.setState({ images: product.images.slice() });
    }
  }

  onAddClick = () => {
    console.log('clicked');
    const { number } = this.state;
    const { productId, dispatchAddToCart } = this.props;
    dispatchAddToCart({ productId, number });
  };

  onImageClick = index => {
    const { images } = this.state;

    const newImageList = images.slice();

    const currentMainImage = newImageList[0];
    const nextMainImage = newImageList[index];
    newImageList[0] = nextMainImage;
    newImageList[index] = currentMainImage;

    this.setState({ images: newImageList });
  };

  render() {
    const { quantity, images } = this.state;
    const { loading, productsById, productId } = this.props;
    const product = productsById[productId];

    if (loading || !product) {
      return <Loading message="Fetching your product" />;
    }

    const quantityOptions = Array(10)
      .fill(1)
      .map((opt, i) => (
        <option value={i + 1} selected={quantity === i + 1}>
          {i + 1}
        </option>
      ));

    return (
      <Fragment>
        <div className="container productInfo">
          <div className="row topRow">
            <div className="col-xs-12 col-sm-6">
              <img className="mainImage" src={images[0]} />
            </div>
            <div className="col-xs-12 col-sm-6">
              <h1>{product.name}</h1>
              <hr />
              <h6 className="price">{`Price $${product.price}`}</h6>
              <h4 className="shortDescription">{product.shortDescription}</h4>
              <div className="form-row flex-container">
                <div className="col quantity">
                  <label htmlFor="inputGroupSelect02">Quantity</label>
                  <select
                    onChange={e => this.setState({ quantity: +e.target.value })}
                    className="form-control"
                    id="inputGroupSelect02"
                  >
                    {quantityOptions}
                  </select>
                </div>
                <div className="col addToCart">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onAddClick}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row longDescription">
            <div className="col-xs-12">
              <h3>Product Description</h3>
              {product.longDescription.map(desc => (
                <p className="text-justify" key={v4()}>
                  {desc}
                </p>
              ))}
            </div>
          </div>
          <hr />
          <div className="otherImages">
            {images.map(
              (image, i) =>
                i === 0 ? null : (
                  <div
                    key={`image_${image}_${i}`}
                    onClick={() => this.onImageClick(i)}
                    className="otherImage"
                  >
                    <img src={image} />
                  </div>
                )
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ products: { loading, productsById } }) => ({
  loading,
  productsById,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProduct: fetchProduct(dispatch),
  // Thunk pattern
  dispatchAddToCart: ({ productId, number }) =>
    dispatch(updateCart({ productId, number })),
});

const ProductInfo = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match: { params: { productId } } }) => ({
    productId,
  }))
)(_ProductInfo);

export default ProductInfo;
