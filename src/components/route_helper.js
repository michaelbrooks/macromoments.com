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

  linkToImage = (album, idx) => {
    return `/${album}/${idx + 1}`;
  }

  linkToAlbum = (album) => {
    return `/${album}`;
  }

  goToAlbum = (album) => {
    const target = album || this.props.params.album;
    browserHistory.push(this.linkToAlbum(target));
  }

  goToImage = (album, idx) => {
    browserHistory.push(this.linkToImage(album, idx));
  }

  _changeImage(delta) {
    const {
      album,
      image,
    } = this.props.params;

    const numImages = albums.size(album);
    const nextImageIdx = Number.parseInt(image, 10) - 1 + delta;

    if (nextImageIdx < 0 || nextImageIdx >= numImages) {
      this.goToAlbum();
    } else {
      this.goToImage(album, nextImageIdx);
    }
  }

  prevImage = () => {
    this._changeImage(-1);
  }

  nextImage = () => {
    this._changeImage(+1);
  }

  render() {
    const {
      album,
      image,
    } = this.props.params;

    const parsedImage = Number.parseInt(10) - 1;

    const routeMethods = {
      linkToImage: this.linkToImage,
      linkToAlbum: this.linkToAlbum,
      goToAlbum: this.goToAlbum,
      goToImage: this.goToImage,
      nextImage: this.nextImage,
      prevImage: this.prevImage,
    };

    return (
      <Component
        album={album} imageIndex={parsedImage}
        {...routeMethods}
        {...this.props} />
    );
  }
}
