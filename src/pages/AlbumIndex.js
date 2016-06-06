import React from 'react';
import { Link } from 'react-router'
import Radium from 'radium';

import FadeImage from '../components/fade_image';
import albums from '../components/albums';

@Radium
class AlbumIndex extends React.Component {

  render() {

    const imgStyle = {
      width: '100%',
      height: '70%',
      margin: '0 0 10px 0',
      display: 'inline-block',

      '@media (min-width: 768px)': {
        width: 314,
        height: 200,
        marginRight: 10,
      },

      '@media (min-width: 992px)': {
        width: '100%',
        height: 500,
      },

      '@media (min-width: 1200px)': {
        width: '100%',
      },
    }

    const album = this.props.params.album;

    let images = albums.getImages(album)
      .map((url, idx) => {
        return (
          <div style={imgStyle} key={album + idx}>
            <Link to={`/${album}/${idx + 1}`}>
              <FadeImage src={url}/>
            </Link>
          </div>
        )
        //return <img src={url} key={key} style={imgStyle} />
      });

    return (
      <div style={{
        margin: 10,
      }}>
        { images }
      </div>
    );
  }
}

export default AlbumIndex;
