import React from 'react';
import ReactDOM from 'react-dom';

/*
http://buildwithreact.com/article/fade-in-image-recipe
*/

/*
.image { opacity: 0; transition: opacity 0.3s; }
.image-loaded { opacity: 1; }
*/
const initialState = {
  loaded: false,
  imageWidth: null,
  imageHeight: null,
  boxWidth: null,
  boxHeight: null,
};

export default class FadeImage extends React.Component {

  static propTypes = {
    loading: React.PropTypes.any,
    onClick: React.PropTypes.func,
    size: React.PropTypes.oneOf(['cover', 'contain']),
    src: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    size: 'cover',
  }

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      if (this.state.loaded) {
        this.setState(initialState);
        this.img = null;
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateBoxSize);
    this._startLoadingImage();
    this._updateBoxSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateBoxSize);
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      this._startLoadingImage();
    }
  }

  _updateBoxSize = () => {
    const imgNode = ReactDOM.findDOMNode(this.refs.image);
    this.setState({
      boxWidth: imgNode.offsetWidth,
      boxHeight: imgNode.offsetHeight,
    });
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
        imageHeight: this.img.height,
        imageWidth: this.img.width,
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

    const {
      imageHeight,
      imageWidth,
      boxWidth,
      boxHeight,
      loaded,
    } = this.state;

    const style = {
      opacity: loaded ? 1 : 0,
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

    let bkgWidth = 1;
    let bkgHeight = 1;
    let bkgTop = 0;
    let bkgLeft = 0;
    if (size === 'contain' && imageWidth !== null && boxWidth !== null) {
      const imgProportion = imageWidth / imageHeight;
      const boxProportion = boxWidth / boxHeight;
      if (imgProportion > boxProportion) {
        bkgHeight = boxProportion / imgProportion;
        bkgTop = 0.5 * (1 - bkgHeight);
      } else {
        bkgWidth = imgProportion / boxProportion;
        bkgLeft = 0.5 * (1 - bkgWidth);
      }
    }

    const bkgStyle = {
      position: 'absolute',
      top: `${bkgTop * 100}%`,
      left: `${bkgLeft * 100}%`,
      width: `${bkgWidth * 100}%`,
      height: `${bkgHeight * 100}%`,
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
          <div style={imgStyle} ref="image">
            <div style={bkgStyle} onClick={onClick || null}></div>
          </div>
        </div>
      </div>
    );
  }
}
