import React from 'react';

import albums from '../components/albums';
import FadeImage from '../components/fade_image';

export default class Image extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired,
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
