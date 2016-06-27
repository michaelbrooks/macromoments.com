import React, { PropTypes } from 'react';
import Radium from 'radium';

import albums from '../components/albums';
import FadeImage from '../components/fade_image';
import RouteHelper from '../components/route_helper';

@RouteHelper
export default class Image extends React.Component {

  static propTypes = {
    album: PropTypes.string.isRequired,
    goToAlbum: PropTypes.func.isRequired,
    hasNextImage: PropTypes.func.isRequired,
    hasPrevImage: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
    nextImage: PropTypes.func.isRequired,
    prevImage: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _onImageClick = (e) => {
    e.stopPropagation();
    this.props.nextImage();
    return false;
  }

  _onLeftArrowClick = (e) => {
    this.props.prevImage();
    e.stopPropagation();
    return false;
  }

  _onRightArrowClick = (e) => {
    this.props.nextImage();
    e.stopPropagation();
    return false;
  }

  _onBackgroundClick = () => {
    this.props.goToAlbum();
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
      hasNextImage,
      hasPrevImage,
    } = this.props;

    const style = {
      position: 'absolute',
      top: 0,
      bottom: 60,
      width: '100%',
      overflow: 'hidden',
      padding: 20,
      boxSizing: 'border-box',
    };

    const url = albums.loadImage(album, imageIndex);

    const leftArrow = {
      position: 'absolute',
      left: 50,
      top: '50%',
    };

    const rightArrow = {
      position: 'absolute',
      right: 50,
      top: '50%',
    };

    return (
      <div style={style} onClick={this._onBackgroundClick}>
        <FadeImage
          ref="image"
          src={url}
          size="contain"
          loading="loading..."
          onClick={this._onImageClick}
        />
        <div style={leftArrow}>
          <Arrow direction="left" onClick={this._onLeftArrowClick} enabled={hasPrevImage()}/>
        </div>
        <div style={rightArrow}>
          <Arrow direction="right" onClick={this._onRightArrowClick} enabled={hasNextImage()}/>
        </div>
      </div>
    );
  }
}

@Radium
class Arrow extends React.Component {
  static propTypes = {
    direction: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    enabled: true,
  };

  render() {
    const {
      direction,
      onClick,
      enabled,
    } = this.props;

    const baseStyle = {
      fontSize: 56,
      lineHeight: '16px',
      height: 26,
      width: 18,
      padding: 10,
      marginLeft: -19,
      marginTop: -23,
      fontFamily: 'serif',
      opacity: 0,
      color: 'white',
      transition: 'opacity 200ms ease',
      userSelect: 'none',

      ':hover': {
        opacity: 0,
      },
    };

    const enabledStyle = {
      opacity: 0.3,
      cursor: 'pointer',

      ':hover': {
        opacity: 1,
      },
    };

    const styles = [baseStyle, enabled && enabledStyle];

    const content = direction === 'left' ? '‹' : '›';

    return <div style={styles} onClick={onClick || null}>{content}</div>;
  }
}
