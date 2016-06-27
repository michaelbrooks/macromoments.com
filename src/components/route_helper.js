import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import albums from './albums';

export default (Component) => class extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      album: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
  }

  linkToImage = (album, idx) => `/${album}/${idx + 1}`;

  linkToAlbum = (album) => `/${album}`;

  goToAlbum = (album) => {
    const target = album || this.props.params.album;
    browserHistory.push(this.linkToAlbum(target));
  }

  goToImage = (album, idx) => {
    browserHistory.push(this.linkToImage(album, idx));
  }

  _changeImage(delta) {
    const nextImageIdx = this._albumHasImage(delta);
    if (nextImageIdx === null) {
      this.goToAlbum();
    } else {
      this.goToImage(this.props.params.album, nextImageIdx);
    }
  }

  _albumHasImage(delta) {
    const {
      album,
    } = this.props.params;

    const numImages = albums.size(album);
    const nextImageIdx = this._getImageIndex() + delta;

    if (nextImageIdx < 0 || nextImageIdx >= numImages) {
      return null;
    }

    return nextImageIdx;
  }

  _getImageIndex() {
    return Number.parseInt(this.props.params.image, 10) - 1;
  }

  hasPrevImage = () => this._albumHasImage(-1) !== null;
  hasNextImage = () => this._albumHasImage(+1) !== null;
  prevImage = () => this._changeImage(-1);
  nextImage = () => this._changeImage(+1);

  render() {
    const {
      album,
    } = this.props.params;

    const parsedImage = this._getImageIndex();

    const routeMethods = {
      linkToImage: this.linkToImage,
      linkToAlbum: this.linkToAlbum,
      goToAlbum: this.goToAlbum,
      goToImage: this.goToImage,
      nextImage: this.nextImage,
      prevImage: this.prevImage,
      hasNextImage: this.hasNextImage,
      hasPrevImage: this.hasPrevImage,
    };

    return (
      <Component
        album={album}
        imageIndex={parsedImage}
        {...routeMethods}
        {...this.props}
      />
    );
  }
};
