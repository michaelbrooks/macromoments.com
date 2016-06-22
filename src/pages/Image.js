import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import albums from '../components/albums';
import FadeImage from '../components/fade_image';
import RouteHelper from '../components/route_helper';

@RouteHelper
export default class Image extends React.Component {

  static propTypes = {
    album: PropTypes.string.isRequired,
    imageIndex: PropTypes.number.isRequired,
    goToAlbum: PropTypes.func.isRequired,
    nextImage: PropTypes.func.isRequired,
    prevImage: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('click', this._onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('click', this._onDocumentClick);
  }

  _onDocumentClick = (e) => {
    const image = ReactDOM.findDOMNode(this.refs.image);
    if (image === e.target || image.contains(e.target)) {
      console.log('in');
    } else {
      console.log('out');
    }
    e.preventDefault();
    return false;
  }

  _onImageClick = (e) => {
    console.log('in (from image)');
    e.preventDefault();
    return false;
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.props.goToAlbum();
    } else if (e.key === 'ArrowLeft') {
      this.props.prevImage();
    } else if (e.key === 'ArrowRight') {
      this.props.nextImage();
    }
  }

  render() {
    const {
      album,
      imageIndex,
    } = this.props;

    const imgStyle = {
      position: 'absolute',
      top: 0,
      bottom: 60,
      width: '100%',
      overflow: 'hidden',
      padding: 20,
      boxSizing: 'border-box',
    };

    const url = albums.getImage(album, imageIndex);

    return (
      <div style={imgStyle}>
        <FadeImage
          ref="image"
          src={url}
          size="contain"
          loading="loading..."
          onClick={this._onImageClick}
        />
      </div>
    );
  }
}
