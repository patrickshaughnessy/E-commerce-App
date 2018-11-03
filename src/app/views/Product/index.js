import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import { formatPrice } from '../../../../lib/utils';
import { fetchProduct } from '../../redux/products';
import { updateCart } from '../../redux/cart';
import Loading from '../../components/Loading';
import ImageSection from './ImageSection';
import QuantitySelect from '../../components/QuantitySelect';

class _Product extends Component {
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
    } else {
      this.setState({ images: productsById[productId].images.slice() });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { images } = this.state;
    const product = nextProps.productsById[nextProps.productId];
    console.log('nextProps', product);
    if (!images.length && product) {
      this.setState({ images: product.images.slice() });
    }
  }

  onAddClick = () => {
    const { quantity } = this.state;
    const { productId, dispatchAddToCart } = this.props;
    console.log('clicked', productId, quantity);
    dispatchAddToCart({ productId, quantity });
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
    const { quantity } = this.state;
    const { loading, productsById, productId } = this.props;
    const product = productsById[productId];

    if (loading || !product) {
      return <Loading message="Fetching your product" />;
    }

    return (
      <div id="productPage" className="container">
        <div className="row topRow">
          <div className="col-xs-12 col-sm-6">
            <ImageSection images={product.images} />
            <hr className="d-block d-sm-none" />
          </div>
          <div className="col-xs-12 col-sm-6">
            <h1>{product.name}</h1>
            <h6 className="price">{`Price: $${formatPrice(product.price)}`}</h6>
            <hr />
            <h4 className="shortDescription">{product.shortDescription}</h4>
            <div className="form-row flex-container">
              <div className="col quantity">
                <label htmlFor="inputGroupSelect02">Quantity</label>
                <QuantitySelect
                  quantity={quantity}
                  onChange={e => this.setState({ quantity: +e.target.value })}
                />
              </div>
              <div className="col addToCart">
                <button
                  type="button"
                  className="btn btn-lg btn-primary"
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
              <p key={v4()} className="text-justify">
                {desc}
              </p>
            ))}
          </div>
        </div>
      </div>
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
  dispatchAddToCart: ({ productId, quantity }) =>
    dispatch(updateCart({ productId, quantity })),
});

const Product = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match: { params: { productId } } }) => ({
    productId,
  }))
)(_Product);

export default Product;
