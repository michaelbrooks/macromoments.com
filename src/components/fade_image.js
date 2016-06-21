import React from 'react';
import ReactDOM from 'react-dom';

/*
http://buildwithreact.com/article/fade-in-image-recipe
*/

/*
.image { opacity: 0; transition: opacity 0.3s; }
.image-loaded { opacity: 1; }
*/

export default class FadeImage extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    src: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['cover', 'contain']),
    loading: React.PropTypes.any,
  }

  static defaultProps = {
    size: 'cover',
  }

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      height: null,
      width: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      if (this.state.loaded) {
        this.setState({
          loaded: false,
          height: null,
          width: null,
        });
        this.img = null;
      }
    }
  }

  componentDidMount() {
    this._startLoadingImage();
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      this._startLoadingImage();
    }
  }

  _startLoadingImage() {
    this.img = new window.Image();
    this.img.onload = this._imgLoadHandler(this.props.src);
    this.img.src = this.props.src;
  }

  _imgLoadHandler = (src) => () => {
    // Make sure this image is still current
    if (this.props.src === src) {
      this.setState({
        loaded: true,
        height: this.img.height,
        width: this.img.width,
      });
    }
  }

  render() {
    const {
      src,
      size,
      onClick,
      loading,
    } = this.props;

    const style = {
      opacity: this.state.loaded ? 1 : 0,
      transition: 'opacity 0.3s',
    };

    const imgStyle = {
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: size,
      width: '100%',
      height: '100%',
      position: 'relative',
    };

    const loadingStyle = {
      textAlign: 'center',
      lineHeight: '16px',
      fontSize: 16,
      marginTop: -8,
      color: 'white',
      position: 'absolute',
      width: '100%',
      top: '50%',
      left: 0,
    };

    const loadingContent = loading ?
      <div style={loadingStyle}>{loading}</div> : null;

    return (
      <div>
        {loadingContent}
        <div style={style}>
          <div style={imgStyle} onClick={onClick || null}></div>
        </div>
      </div>
    );
  }
}
