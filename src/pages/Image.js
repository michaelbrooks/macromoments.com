import React from 'react';
import { browserHistory } from 'react-router';

import albums from '../components/albums';
import FadeImage from '../components/fade_image';

export default class Image extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired,
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      const album = this.props.params.album;
      browserHistory.push(`/${album}`);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  render() {
    const {
      album,
      image,
    } = this.props.params;

    const idx = Number.parseInt(image, 10) - 1;
    const url = albums.getImage(album, idx);

    const imgStyle = {
      position: 'absolute',
      top: 0,
      bottom: 60,
      width: '100%',
      overflow: 'hidden',
      padding: 20,
      boxSizing: 'border-box',
    };

    return (
      <div style={imgStyle}>
        <FadeImage src={url} size="contain" />
      </div>
    );
  }
}
