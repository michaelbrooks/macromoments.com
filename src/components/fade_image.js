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

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  onImageLoad = () => {
    this.setState({ loaded: true });
  }

  componentDidMount() {
    if (!this.state.loaded) {
      var img = new window.Image();
      img.onload = this.onImageLoad;
      img.src = this.props.src;
    }
  }

  render() {
    const {
      src,
      width,
      height,
    } = this.props;

    const style = {
      opacity: this.state.loaded ? 1 : 0,
      transition: 'opacity 0.3s',
    };

    const imgStyle = {
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
      width: '100%',
      height: '100%',
    };

    return (
      <div style={style}>
        <div style={imgStyle} ></div>
      </div>
    );
  }
}
