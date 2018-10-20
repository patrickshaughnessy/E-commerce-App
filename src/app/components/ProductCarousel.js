import React, { Fragment, Component } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import { fetchProducts } from '../redux/products/reducer';

class _ProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  componentDidMount() {
    const {
      dispatchFetchProducts,
      productsByCategory,
      product: { category },
    } = this.props;
    if (!productsByCategory[category]) {
      dispatchFetchProducts();
    }
  }

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = num => {
    if (this.animating) return;
    const items = this.getProductsRows(num);
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = num => {
    if (this.animating) return;
    const items = this.getProductsRows(num);
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  getProductsRows = num => {
    const {
      productsByCategory,
      product: { category, _id },
    } = this.props;
    const filteredProducts = (productsByCategory[category] || []).filter(
      p => p._id !== _id
    );

    const productRowsDesktop = filteredProducts.reduce((acc, product, i) => {
      if (i % num === 0) {
        acc.push([product]);
      } else {
        acc[acc.length - 1].push(product);
      }
      return acc;
    }, []);

    return productRowsDesktop;
  };

  renderProduct = product => (
    <div className="col-xs-12 col-sm-4">
      <img src={product.images[0]} alt="text" />
      <span className="">{product.name}</span>
      <span className="float-right">{product.price}</span>
    </div>
  );

  renderSlides = num => {
    const productRowsDesktop = this.getProductsRows(num);
    const slides = productRowsDesktop.map(row => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={v4()}
      >
        <div className="row">{row.map(this.renderProduct)}</div>
      </CarouselItem>
    ));
    return slides;
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Fragment>
        <div className="d-block d-sm-none">
          <Carousel
            activeIndex={activeIndex}
            next={() => this.next(1)}
            previous={() => this.previous(1)}
            interval={false}
          >
            {this.renderSlides(1)}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={() => this.previous(1)}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={() => this.next(1)}
            />
          </Carousel>
        </div>
        <div className="d-none d-sm-block">
          <Carousel
            activeIndex={activeIndex}
            next={() => this.next(3)}
            previous={() => this.previous(3)}
            interval={false}
          >
            {this.renderSlides(3)}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={() => this.previous(3)}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={() => this.next(3)}
            />
          </Carousel>
        </div>
      </Fragment>
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
