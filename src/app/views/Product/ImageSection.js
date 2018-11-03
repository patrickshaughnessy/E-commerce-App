import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import Loading from '../../components/Loading';
import { fetchProduct } from '../../redux/products';
import { updateCart } from '../../redux/cart';

class ImageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images.slice(),
    };
  }

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
    const { images } = this.state;

    if (!images.length) return null;

    return (
      <div id="imageSection" className="container">
        <div className="row">
          <div className="col mainImage">
            <img
              className="img-fluid shadow p-3 bg-white rounded"
              src={images[0].src}
              alt={images[0].alt}
            />
          </div>
          <div className="col sideImages">
            {images.map(
              (image, i) =>
                i === 0 ? null : (
                  <div key={image.src} className="sideImage">
                    <button
                      type="button"
                      className="btn btn-light shadow-sm p-3 bg-white rounded"
                      key={image.src}
                      onClick={() => this.onImageClick(i)}
                    >
                      <img
                        className="img-fluid"
                        src={image.src}
                        alt={image.alt}
                      />
                    </button>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageSection;
